import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, PUT, POST, DELETE',
  });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
