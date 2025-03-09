// eslint-disable-next-line prettier/prettier
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhoneSpecs } from "./phone-specs.entity";
import { OS } from "./os.entity";
import { Display } from "./display.entity";
import { Camera } from "./camera.entity";
import { Battery } from "./battery.entity";


@Entity()
export class Telephone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modell: string;

  @Column()
  marka: string;

  @Column()
  megjelenes_ev: number;

  @Column()
  ar: number;

  @Column()
  kepUrl: string;

  @OneToOne(() => PhoneSpecs, (specs) => specs.telephone)
  specs: PhoneSpecs;

  @OneToOne(() => OS, (os) => os.telephone)
  os: OS;

  @OneToOne(() => Display, (display) => display.telephone)
  display: Display;

  @OneToOne(() => Camera, (camera) => camera.telephone)
  camera: Camera;

  @OneToOne(() => Battery, (battery) => battery.telephone)
  battery: Battery;

}