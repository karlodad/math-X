import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  datalife: string;
}
