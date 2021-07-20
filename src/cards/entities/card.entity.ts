import { IsEnum, IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CardType } from "../cardtype.enum";
import { Continent } from "../continent.enum";
import { Faction } from "../faction.enum";

@Entity({ orderBy: { name: "ASC" } })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ type: "enum", enum: Continent })
  @IsEnum(Continent)
  continent: Continent;

  @Column({ type: "enum", enum: Faction })
  @IsEnum(Faction)
  faction: Faction;

  @Column({ type: "enum", enum: CardType, default: CardType.PROPAGATION })
  @IsEnum(CardType)
  cardType: CardType;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @IsString()
  sideEffect: string;
}
