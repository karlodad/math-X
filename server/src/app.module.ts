import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtGuard } from './common/guards/AtGuard';
import { UserModule } from './user/user.module';
import { QuestionsModule } from './questions/questions.module';
import { GameModule } from './game/game.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { EventssModule } from './eventss/eventss.module';

@Module({
  imports: [
    UserModule,
    QuestionsModule,
    GameModule,
    EventsModule,
    ScheduleModule.forRoot(),
    EventssModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
