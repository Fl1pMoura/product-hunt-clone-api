import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUpvoteDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: string;
}
