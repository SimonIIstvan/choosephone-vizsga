import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Telephone } from "./telephone.entity";

@Entity()
export class Camera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fo_kamera: number;

    @Column()
    szelfi_kamera: number;

    @Column()
    video_felvetel: number;

    @Column()
    video_fps: number;

    @Column()
    ai_tamogatas: boolean;

    @OneToOne(() => Telephone, (telephone) => telephone.camera)
    @JoinColumn()
    telephone: Telephone

}