import { IsNumber, IsString } from 'class-validator';

export class AuthResponseDto {
  @IsString()
  token: string;

  @IsNumber()
  expiresIn: number;
}
