import { Injectable } from '@nestjs/common';
import { Question } from './DTO/question.schema';
import { answersStorage } from './storage/answerstorage';

@Injectable()
export class QuestionsService {
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

  createQuestions(count: number, difficultlvl: number, userID: string) {
    const masQuestions: Question[] = [];
    const answers: (number | string)[] = [];
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

      question.a = this.getRndInteger(min, max);
      question.b = this.getRndInteger(min, max);

      switch (symbol) {
        case 0: //plus
          question.symbol = '+';
          question.c = question.a + question.b;
          this.chance(chance, question, '+', answers);
          break;
        case 1: //minus
          question.symbol = '-';
          question.c = question.a - question.b;

          this.chance(chance, question, '-', answers);
          break;
        case 2: //multi
          question.symbol = '*';
          question.c = question.a * question.b;

          this.chance(chance, question, '*', answers);
          break;
        case 3: //division
          question.symbol = '/';
          question.a = question.a * question.b;
          question.c = question.a / question.b;

          this.chance(chance, question, '/', answers);
          break;
      }
      question.answers = this.createWrongAnswer(answers.at(-1), difficultlvl);
      masQuestions.push(question);
    }
    if (answersStorage.has(userID)) {
      const userAnsStor = answersStorage.get(userID);
      const newArr = userAnsStor.answers.concat(answers);
      answersStorage.set(userID, {
        answers: newArr,
        updateDate: new Date().getTime(),
      });
    } else
      answersStorage.set(userID, { answers, updateDate: new Date().getTime() });
    return masQuestions;
  }

  chance(
    chance: number,
    question: Question,
    operator: string,
    answers: (number | string)[],
  ) {
    if (chance < 0.5) {
      if (operator === '+') answers.push(+question.a + +question.b);
      if (operator === '-') answers.push(+question.a - +question.b);
      if (operator === '*') answers.push(+question.a * +question.b);
      if (operator === '/') answers.push(+question.a / +question.b);
      question.c = '?';
    } else if (chance < 0.6) {
      answers.push(question.a);
      question.a = '?';
    } else if (chance < 0.7) {
      answers.push(question.b);
      question.b = '?';
    } else {
      question.symbol = '?';
      answers.push(operator);
    }
  }

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createWrongAnswer(answer: number | string, countAnsw: number) {
    if (typeof answer === 'string') return this.shuffle(this.operators);
    const maxAnswer = this.difficult[countAnsw].maxAnswer;
    const range = this.difficult[countAnsw].range;
    const answers: number[] = [];
    answers.push(answer);

    while (answers.length < maxAnswer) {
      const newAns = this.getRndInteger(answer - range, answer + range);
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

  getAnswers(id: string) {
    const ans = answersStorage.get(id);
    return ans;
  }
}
