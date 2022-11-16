import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { getQuestions } from 'src/questions/DTO/getquestion';
import { ReturnAns } from 'src/questions/DTO/returnQuestions';
import { QuestionsService } from 'src/questions/questions.service';
import { WsGuard } from 'src/user/strategies/ws.strats';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly quest: QuestionsService) {}
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('getQuestionsInf')
  async identity(@MessageBody() data: getQuestions) {
    const questions = await this.quest.createQuestions(
      data.count,
      data.difficultLvl,
      '1',
    );

    this.server.emit('postQuestionsInf', questions);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
