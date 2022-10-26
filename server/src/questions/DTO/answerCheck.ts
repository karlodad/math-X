import { ApiProperty } from "@nestjs/swagger";

export class AnswersCheck {
  @ApiProperty()
  id: string;
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  answer: string;
}
