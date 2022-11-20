import { ApiProperty } from '@nestjs/swagger';

export class AnswersCheck {
  @ApiProperty()
  id: string;
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  answer: string;
}

export class QuestionCheck {
  @ApiProperty()
  a: number | string;
  @ApiProperty()
  b: number | string;
  @ApiProperty()
  c: number | string;
  @ApiProperty()
  symbol: string;
  @ApiProperty()
  answer: string;
}
