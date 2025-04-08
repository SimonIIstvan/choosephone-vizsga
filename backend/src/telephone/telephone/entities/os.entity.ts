import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Telephone } from "./telephone.entity";

@Entity()
export class OS {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    os: string;

    @Column()
    os_verzio: number;

    @Column()
    ui: string;

    @OneToOne(() => Telephone, (telephone) => telephone.os)
    @JoinColumn() //Foreign Key
    telephone: Telephone


}