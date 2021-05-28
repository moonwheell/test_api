import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsArray()
  tags: string[];

  @IsDateString()
  releaseDate: Date;
}
