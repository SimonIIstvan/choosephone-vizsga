import { Battery } from "./battery.model";
import { Camera } from "./camera.model";
import { Display } from "./display.model";
import { Os } from "./os.model";
import { Specs } from "./specs.model";

export interface Telephone {
    id: number;
    modell: string;
    marka: string;
    megjelenes_ev: number;
    ar: number;
    kepUrl: string;
    battery: Battery;
    display: Display;
    os: Os;
    specs: Specs;
    camera: Camera;
}