import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturersService {
  private logger = new Logger(ManufacturersService.name);

  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async findManufacturerByGame(id: number): Promise<Manufacturer> {
    return await this.manufacturerRepository
      .findOne(
        {},
        {
          relations: ['games'],
          where: {
            game_id: id,
          },
        },
      )
      .catch((error) => {
        this.logger.error(error);
        if (error?.name === 'EntityColumnNotFound') {
          throw new NotFoundException(`Game with ID ${id} not found`);
        }
        throw new InternalServerErrorException(error);
      });
  }
}
