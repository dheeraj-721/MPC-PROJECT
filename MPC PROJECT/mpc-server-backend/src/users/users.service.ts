import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom, map } from 'rxjs';
import { deployWallet, executeUserOperation, getAddress, getBalance, getCallData, getHash } from 'src/services/onChainTransactions';
import { Signature, UserOp } from 'src/services/types';
import { Repository } from 'typeorm';
import { createWalletDto } from './dto/createWallet.dto';
import { signatureDto } from './dto/signature.dto';
import { userMpcDto } from './dto/userMpc.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async checkUser(req) {
    const email = req.user.email;
    const exist = await this.usersRepo.findOneBy({ email: email });
    if (exist) {
      if (exist.isKeyGenerated == true) {
        return { status: true, keyGenerated: true };
      }
      return { status: true, keyGenerated: false };
    } else {
      return { status: false };
    }
  }

  async setMpcDetails(req, body: userMpcDto) {
    const tempVal = Math.random().toFixed(10);
    const email = req.user.email;
    const { share1Name, share2Name, share3Name } = body;
    const userObj = new Users();
    userObj.share1Name = share1Name;
    userObj.share2Name = share2Name;
    userObj.share3Name = share3Name;
    userObj.roomId = `${req.user.firstName}${tempVal}`;
    userObj.isKeyGenerated = true;
    await this.usersRepo.update({ email: email }, userObj);
    return {
      status: true,
    };
  }

  async createWallet(body: createWalletDto) {
    try {
      const { pubKey } = body;
      const owner = getAddress(pubKey);
      const salt = Math.floor(Math.random() * 1000).toString();
      console.log('salt:::', salt, "Owner::::", owner);
      const addr = await deployWallet(owner, salt);
      // if(addr != null){
      //   this.usersRepo.update({email:})
      // }
      console.log("sdfghjkl;", addr);
      
      return addr;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkBalance(account:string){
    try {
      const bal = await getBalance(account);
      return {balance:bal.toString()};
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async signTransaction(body:signatureDto){
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendTransaction(body: signatureDto) {
    try {
      const { txObj, signature } = body;
      const parsedSign = JSON.parse(signature)
      console.log(parsedSign[1], parsedSign[3], parsedSign[5]);
      let r = parsedSign[1];
      let s = parsedSign[3];
      let v = parsedSign[5];
      if(v == 0) {
        v = 27;
      }else if(v == 1){
        v = 28
      }
      const data = JSON.parse(txObj)
      const hashedData = getHash(txObj);
      console.log("hashedData::::",typeof txObj, txObj, hashedData, r, s, v);
      const userOpObj = new UserOp();
      userOpObj.sender = data.from;
      userOpObj.to = data.to;
      userOpObj.amount = data.amount;
      userOpObj.message = hashedData;
      userOpObj.signature = new Signature();
      if(r.length != 64){
        const rem = 64 - r.length;
        for(let i = 0; i<rem; i++){
          r = `0${r}`;
        }
      }
      userOpObj.signature.r = `0x${r}`;
      if(s.length != 64){
        const rem = 64 - s.length;
        for(let i = 0; i<rem; i++){
          s = `0${s}`;
        }
      }
      userOpObj.signature.s = `0x${s}`;
      userOpObj.signature.v = v; 
      console.log("runnning::::::::::::::::::::::::::::::", userOpObj);
      
      const result = await executeUserOperation(userOpObj);
      
      // const response = await firstValueFrom(
      //   this.httpService
      //     .post(
      //       'http://localhost:3001/verify',
      //       { message: hashedData, r: r, s: s },
      //       {
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Access-Control-Allow-Headers': '*',
      //           'Access-Control-Allow-Origin': '*',
      //         },
      //       },
      //     )
      //     .pipe(
      //       map(async (res) => {
      //         return res.data;
      //       }),
      //     )
      //     .pipe(
      //       catchError((e) => {
      //         console.log(e);
      //         throw new BadRequestException('Signature is not verified');
      //       }),
      //     ),
      // );
      // let res;

      return { status: true, transactionHash: result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getHashData(data:string){
    const res = getHash(data);
    return res;
  }

  async getMpcDetails(req) {
    try {
      const email = req.user.email;
      const exist = await this.usersRepo.findOneBy({
        email: email,
        isKeyGenerated: true,
      });
      if (exist) {
        return {
          share1Name: exist.share1Name,
          share2Name: exist.share2Name,
          share3Name: exist.share3Name,
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }
    const userExist = await this.usersRepo.findOneBy({ email: req.user.email });
    if (!userExist) {
      const userObj = new Users();
      userObj.firstName = req.user.firstName;
      userObj.lastName = req.user.lastName;
      userObj.email = req.user.email;
      this.usersRepo.save(userObj);
    }
    const jwt = await this.jwtService.signAsync(
      { email: req.user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );
    res.redirect(`http://localhost:3000/Signing?jwtToken=${jwt}`);
  }

  async getCallData(to, value){
    return getCallData(to,value);
  }
}
