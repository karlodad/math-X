import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AnswersCheck } from './DTO/answerCheck';
import { getQuestions } from './DTO/getquestion';
import { ReturnAns } from './DTO/returnQuestions';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly Qust: QuestionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: ReturnAns })
  getQuestion(@Body() body: getQuestions, @Req() req: Request) {
    return this.Qust.createQuestions(
      body.count,
      body.difficultLvl,
      req.user['id'],
    );
  }

  @Post()
  @ApiResponse({ status: 200, type: AnswersCheck })
  checkAnswers(@Body() body: AnswersCheck) {
    return this.Qust.checkAnswer(body);
  }
}
