import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { AnswersCheck } from './DTO/answerCheck';
import { Answers } from './DTO/answers.schema';
import { Question } from './DTO/question.schema';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  operators = ['+', '-', '*', '/'];

  difficult = {
    1: {
      max: 10,
      min: 1,
      maxAnswer: 4,
      range: 5,
    },
    2: {
      max: 50,
      min: 10,
      maxAnswer: 4,
      range: 5,
    },
    3: {
      max: 100,
      min: 10,
      maxAnswer: 4,
      range: 5,
    },
    4: {
      max: 1000,
      min: 100,
      maxAnswer: 4,
      range: 5,
    },
  };

  async createQuestions(count: number, difficultlvl: number) {
    const masQuestions: Question[] = [];
    // const answers: Answers[] = [];
    const max = this.difficult[difficultlvl].max;
    const min = this.difficult[difficultlvl].min;

    for (let i = 0; i < count; i++) {
      const symbol = this.getRndInteger(0, 3);
      const chance = Math.random();

      let question: Question = {
        a: '',
        b: '',
        c: '',
        symbol: '',
        answers: [],
      };

      // let answer: Answers = {
      //   userId: userID,
      //   correctAnswer: '',
      //   gameId: 1,
      // };

      question.a = this.getRndInteger(min, max);
      question.b = this.getRndInteger(min, max);
      let corrAns: string;
      switch (symbol) {
        case 0: //plus
          question.symbol = '+';
          question.c = question.a + question.b;
          corrAns = this.chance(chance, question, '+');
          break;
        case 1: //minus
          question.symbol = '-';
          question.c = question.a - question.b;
          corrAns = this.chance(chance, question, '-');
          break;
        case 2: //multi
          question.symbol = '*';
          question.c = question.a * question.b;
          corrAns = this.chance(chance, question, '*');
          break;
        case 3: //division
          question.symbol = '/';
          question.a = question.a * question.b;
          question.c = question.a / question.b;
          corrAns = this.chance(chance, question, '/');
          break;
      }
      question.answers = this.createWrongAnswer(corrAns, difficultlvl);
      masQuestions.push(question);
      // answers.push(answer);
    }

    // const masAnsId = await this.saveAnswer(answers);
    return masQuestions;
  }

  chance(chance: number, question: Question, operator: string) {
    if (chance < 0.5) {
      let ans: string;
      if (operator === '+') ans = (+question.a + +question.b).toString();
      if (operator === '-') ans = (+question.a - +question.b).toString();
      if (operator === '*') ans = (+question.a * +question.b).toString();
      if (operator === '/') ans = (+question.a / +question.b).toString();
      question.c = '?';
      return ans;
    } else if (chance < 0.6) {
      const ans = question.a.toString();
      question.a = '?';
      return ans;
    } else if (chance < 0.7) {
      const ans = question.b.toString();
      question.b = '?';
      return ans;
    } else {
      question.symbol = '?';
      return operator;
    }
  }

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createWrongAnswer(correctAnswer: string, countAnsw: number) {
    if (this.operators.includes(correctAnswer))
      return this.shuffle(this.operators);
    const maxAnswer = this.difficult[countAnsw].maxAnswer;
    const range = this.difficult[countAnsw].range;
    const answers: number[] = [];
    answers.push(+correctAnswer);

    while (answers.length < maxAnswer) {
      const newAns = this.getRndInteger(
        +correctAnswer - range,
        +correctAnswer + range,
      );
      if (answers.includes(newAns)) continue;
      else answers.push(newAns);
    }

    return this.shuffle(answers);
  }

  shuffle(array: number[] | string[]) {
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  async saveAnswer(answers: Answers[]) {
    // const data = await this.prisma.answers.createMany({ data: answers });
    // console.log(data);

    const data = await this.prisma.$transaction(
      answers.map((answer) => this.prisma.answers.create({ data: answer })),
    );
    return data.map((e) => e.id);
  }

  async checkAnswer(body: AnswersCheck) {
    const answers = await this.prisma.answers.findMany({
      where: { id: { in: body.id } },
    });

    const score = await this.prisma.score.findUnique({
      where: { id: body.gameId },
    });

    for (let i = 0; i < body.answer.length; i++) {
      if (body.answer[i] === answers[i].correctAnswer) {
        score.points += score.combo;
        score.combo++;
      } else {
        score.combo = 1;
      }
    }
    await this.prisma.answers.updateMany({
      where: { id: { in: body.id } },
      data: { isAnswer: true },
    });
    await this.prisma.score.update({
      where: { id: body.gameId },
      data: { combo: score.combo, points: score.points },
    });

    return score.points;
  }

  @Cron('45 * * * * *')
  async cleanQuestions() {
    await this.prisma.$queryRaw`DELETE FROM public."Answers"
    WHERE "CreateDate" <  now() - interval '1 hour' or "isAnswer" = true`;
  }
}
