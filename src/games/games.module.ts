import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { ManufacturersModule } from '../manufacturers/manufacturers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    ManufacturersModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
