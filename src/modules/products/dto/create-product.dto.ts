import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  creatorId: string;

  @IsString()
  @IsOptional()
  creator: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  createdAt: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  tags: string[];
}
