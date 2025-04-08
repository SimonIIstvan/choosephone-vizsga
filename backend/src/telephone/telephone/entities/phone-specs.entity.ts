import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Telephone } from "./telephone.entity";


@Entity()
export class PhoneSpecs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpu: string;

  @Column()
  gpu: string;

  @Column()
  antutuscore: number;

  @Column()
  memory: number;

  @Column()
  magok_szama: number;

  @Column()
  tarolo_kapacitas: number;

  @Column()
  telephoneId: number;

  @OneToOne(() => Telephone, (telephone) => telephone.specs)
  @JoinColumn()
  telephone: Telephone;
}