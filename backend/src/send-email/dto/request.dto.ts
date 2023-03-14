import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReqeustDto {
  @IsEmail()
  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  body: string;
}
