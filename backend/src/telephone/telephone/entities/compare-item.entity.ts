import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Telephone } from './telephone.entity';

@Entity()
export class CompareItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telephoneId: number;

  @ManyToOne(() => Telephone)
  @JoinColumn({ name: 'telephoneId' })
  phone: Telephone;
}