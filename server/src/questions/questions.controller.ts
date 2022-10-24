import { Body, Controller, Get } from '@nestjs/common';
import { getQuestions } from './DTO/getquestion';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly Qust: QuestionsService) {}

  @Get()
  getQuestion(@Body() body: getQuestions) {
    return this.Qust.createQuestions(body.count, body.difficultLvl);
  }
}
