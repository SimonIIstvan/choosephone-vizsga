import { IsNotEmpty, IsString } from "class-validator";

export class KeresesDto {
    @IsNotEmpty()
    @IsString()
    keresesParam: string;
}