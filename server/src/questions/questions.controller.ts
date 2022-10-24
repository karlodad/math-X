import { Body, Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { getQuestions } from './DTO/getquestion';
import { Question } from './DTO/question.schema';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly Qust: QuestionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Question] })
  getQuestion(@Body() body: getQuestions) {
    return this.Qust.createQuestions(body.count, body.difficultLvl);
  }
}
