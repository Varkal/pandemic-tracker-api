import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { GamesModule } from './games/games.module';

@Module({
  imports: [CardsModule, TypeOrmModule.forRoot(), ConfigModule.forRoot(), GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
