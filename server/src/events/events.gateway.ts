import { Req, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getQuestions } from 'src/questions/DTO/getquestion';
import { QuestionsService } from 'src/questions/questions.service';
import { WsGuard } from 'src/user/strategies/ws.strats';
import { Request } from 'express';
import { QuestionCheck } from 'src/questions/DTO/answerCheck';
import { GameService } from 'src/game/game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private readonly quest: QuestionsService,
    private readonly game: GameService,
  ) {}
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('checkAns')
  check(@MessageBody() data: QuestionCheck) {
    if (data.symbol === '?') data.symbol = data.answer;
    if (data.a === '?') data.a = data.answer;
    if (data.b === '?') data.b = data.answer;
    if (data.c === '?') data.c = data.answer;
    let ans = false;
    console.log(data)
    switch (data.symbol) {
      case '+':
        ans = +data.a + +data.b === data.c;
        break;
      case '-':
        ans = +data.a - +data.b === data.c;
        break;
      case '/':
        ans = +data.a / +data.b === data.c;
        break;
      case '*':
        ans = +data.a * +data.b === data.c;
        break;
    }
    this.server.emit('checkAns', ans);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('getQuestionsInf')
  async identity(@MessageBody() data: getQuestions, @Req() req: Request) {
    console.log(req['UserId']);
    const questions = await this.quest.createQuestions(
      data.count,
      data.difficultLvl,
      '1',
    );

    this.server.emit('getQuestionsInf', questions);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('getGame')
  async getGame(@MessageBody() data: { gameid: number }, @Req() req: Request) {
    const games = await this.game.getGame(data.gameid, req['UserId']);
    this.server.emit('getGame', games);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('newGame')
  async newGame(@MessageBody() data: { gameid: number }, @Req() req: Request) {
    const games = this.game.createNewGame({
      combo: 0,
      points: 0,
      userId: req.user['id'],
      gameId: data.gameid,
    });
    this.server.emit('newGame', games);
  }
  @UseGuards(WsGuard)
  @SubscribeMessage('resumeGame')
  async resumeGame(@MessageBody() data: { id: number }) {
    const games = this.game.resumeGame(data.id);
    this.server.emit('resumeGame', games);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
