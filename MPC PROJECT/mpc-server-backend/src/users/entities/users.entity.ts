import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:true})
    firstName:string;

    @Column({nullable:true})
    lastName:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    walletAddress:string;

    @Column({nullable:true})
    share1Name: string;

    @Column({nullable:true})
    share2Name: string;

    @Column({nullable:true})
    share3Name: string;

    @Column({default:false})
    isKeyGenerated: boolean;

    @Column({nullable:true})
    roomId: string;


}