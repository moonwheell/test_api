import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { UpdateGameDto } from './dto/update-game.dto';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { ManufacturersService } from '../manufacturers/manufacturers.service';

@Controller('games')
export class GamesController {
  constructor(
    private gamesService: GamesService,
    private manufacturersService: ManufacturersService,
  ) {}

  @Post()
  async createFaq(@Body() createFaqDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createFaqDto);
  }

  @Get(':id')
  async getFaqById(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Patch(':id')
  async updateFaq(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.updateFaq(id, updateGameDto);
  }

  @Get()
  async getAllFaqs(): Promise<Game[]> {
    return this.gamesService.getAllGames();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFaq(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gamesService.deleteGame(id);
  }

  @Get('/:id/manufacturer')
  async findManufacturerByGame(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Manufacturer> {
    return this.manufacturersService.findManufacturerByGame(id);
  }
}
