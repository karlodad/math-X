import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { getQuestions } from './DTO/getquestion';
import { Question } from './DTO/question.schema';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly Qust: QuestionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Question] })
  getQuestion(@Body() body: getQuestions, @Req() req: Request) {
    return this.Qust.createQuestions(
      body.count,
      body.difficultLvl,
      req.user['id'],
    );
  }

  @Get('ans')
  getAnswers(@Req() req: Request) {
    return this.Qust.getAnswers(req.user['id']);
  }
}
