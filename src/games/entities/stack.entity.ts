import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Card } from "../../cards/entities/card.entity";
import { Game } from "./game.entity";

@Entity({ orderBy: { order: "DESC" } })
@Unique("uniqueStackByGame", ["order", "game"])
export class GameStack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  order: number;

  @ManyToMany(() => Card, { eager: true })
  @JoinTable()
  cards: Card[];

  @ManyToOne(() => Game)
  game: Game;
}
