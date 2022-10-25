import { ApiProperty } from '@nestjs/swagger';

export class Question {
  @ApiProperty()
  a: number | string;
  @ApiProperty()
  b: number | string;
  @ApiProperty()
  c: number | string;
  @ApiProperty()
  symbol: string;
  @ApiProperty()
  correctAnswer: number | string;
  @ApiProperty({ type: 'number[]' })
  answers: number[] | string[];
}
