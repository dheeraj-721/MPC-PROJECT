import { IsString } from "class-validator";

export class createWalletDto{
    @IsString()
    pubKey:string;

}