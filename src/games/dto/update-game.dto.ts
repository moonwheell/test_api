import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsDateString()
  @IsOptional()
  releaseDate: Date;
}
