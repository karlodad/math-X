import { ApiProperty } from '@nestjs/swagger';

export class getQuestions {
  @ApiProperty()
  count: number;
  @ApiProperty()
  difficultLvl: number;
}
