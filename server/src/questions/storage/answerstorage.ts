export interface AnswerDb {
  answers: (string | number)[];
  updateDate: number;
}

export const answersStorage = new Map<string, AnswerDb>();
