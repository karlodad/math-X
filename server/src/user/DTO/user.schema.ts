import { ApiProperty } from '@nestjs/swagger';

export class getUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  exp: string;
}
