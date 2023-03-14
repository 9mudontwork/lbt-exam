export class CreateEmailLogDto {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  provider: string;
  errorMessage: string;
  isError: boolean;
  createdAt: Date;
  updatedAt: Date;
}
