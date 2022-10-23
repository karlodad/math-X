import { ApiProperty } from '@nestjs/swagger';

export class PartUser {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ nullable: true, required: false })
  hash: string;
}
