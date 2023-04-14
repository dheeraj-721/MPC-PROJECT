import { IsNumber, IsString } from "class-validator";

export class signatureDto{
    @IsString()
    txObj:string;

    @IsString()
    signature:string;

}