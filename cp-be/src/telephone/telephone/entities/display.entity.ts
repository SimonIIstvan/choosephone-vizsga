import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Telephone } from "./telephone.entity";

@Entity()
export class Display {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'decimal', precision: 10, scale: 3})
    kijelzo_meret: number;

    @Column()
    felbontas_szelesseg: number;

    @Column()
    felbontas_magassag: number;

    @Column()
    kepfrissites: number;

    @Column()
    panel_tipus: string;

    @Column()
    vedouveg: string;

    @OneToOne(() => Telephone, (telephone) => telephone.display)
    @JoinColumn()
    telephone: Telephone


}