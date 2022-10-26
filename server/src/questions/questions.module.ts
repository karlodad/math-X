import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}
