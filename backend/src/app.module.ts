import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ConfigModule.forRoot(), PromptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
