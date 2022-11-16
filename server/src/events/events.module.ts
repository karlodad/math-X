import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { QuestionsService } from 'src/questions/questions.service';
import { WsGuard } from 'src/user/strategies/ws.strats';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [JwtModule.register({})],
  providers: [EventsGateway, WsGuard, PrismaService, QuestionsService],
})
export class EventsModule {}
