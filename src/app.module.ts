import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { GamesModule } from "./games/games.module";
import { KeyGuard } from "./key.guard";

@Module({
  imports: [
    CardsModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    GamesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: KeyGuard,
    },
  ],
})
export class AppModule {}
