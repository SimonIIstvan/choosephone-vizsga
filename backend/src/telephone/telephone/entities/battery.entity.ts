import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Telephone } from "./telephone.entity";

@Entity()
export class Battery {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    akkumulator_kapacitas: number

    @Column()
    toltes: number

    @Column()
    vezetek_nelkuli_toltes: boolean

    @OneToOne(() => Telephone, (telephone) => telephone.battery)
    @JoinColumn()
    telephone: Telephone

}