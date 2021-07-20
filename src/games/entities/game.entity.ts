import {
  AfterLoad,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameStack } from "./stack.entity";

@Entity({ orderBy: { creationDate: "DESC" } })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  creationDate: Date;

  @OneToMany(() => GameStack, (stack) => stack.game, { eager: true })
  stacks: GameStack[];

  @AfterLoad()
  sortStacks(): void {
    this.stacks.sort((a, b) => {
      return b.order - a.order;
    });
  }
}
