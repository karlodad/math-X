import { ApiProperty } from '@nestjs/swagger';

export class Question {
  @ApiProperty()
  a: number;
  @ApiProperty()
  b: number;
  @ApiProperty()
  symbol: string;
  @ApiProperty()
  correctAnswer: number;
  @ApiProperty({ type: 'number[]' })
  answers: number[];
}
