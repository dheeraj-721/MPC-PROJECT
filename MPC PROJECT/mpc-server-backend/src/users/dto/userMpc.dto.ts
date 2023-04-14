import { IsBoolean, IsString } from "class-validator";

export class userMpcDto{
    @IsString()
    share1Name: string;

    @IsString()
    share2Name: string;

    @IsString()
    share3Name: string;
}