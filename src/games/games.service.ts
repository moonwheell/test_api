import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class GamesService {
  private logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createGame(createFaqDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createFaqDto);

    return await game.save().catch((error) => {
      this.logger.error(error);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Game already exists');
      }
      throw new InternalServerErrorException();
    });
  }

  async getGameById(id: number): Promise<Game> {
    const res = await this.gameRepository.findOne(id).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    });

    if (!res) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    return res;
  }

  async getAllGames(options?: FindManyOptions<Game>): Promise<Game[]> {
    return this.gameRepository.find(options).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    });
  }

  async updateFaq(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    await this.gameRepository.update(id, updateGameDto).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    });

    return await this.gameRepository.findOne(id);
  }

  async deleteGame(id: number): Promise<void> {
    const res = await this.gameRepository.delete(id).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    });

    if (res.affected === 0) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
  }

  @Cron('0 */12 * * *')
  private async applyDiscount(): Promise<void> {
    await Promise.all([
      this.gameRepository
        .createQueryBuilder('game')
        .delete()
        .where("game.release_date < NOW() - INTERVAL '18 month'")
        .execute(),
      this.gameRepository
        .createQueryBuilder('game')
        .update()
        .where({ IsDiscountApplied: false })
        .where({
          releaseDate: Between(
            "NOW() - INTERVAL '18 month'",
            "NOW() - INTERVAL '12 month'",
          ),
        })
        .set({ price: () => 'price * 0.2' })
        .execute(),
    ]).then((res) => {
      this.logger.log(res);
    });
  }
}
