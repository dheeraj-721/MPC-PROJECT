import { Body, Controller, Get, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { getOwner } from 'src/services/onChainTransactions';
import { createWalletDto } from './dto/createWallet.dto';
import { signatureDto } from './dto/signature.dto';
import { userMpcDto } from './dto/userMpc.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/login")
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @UseGuards(JwtAuthGuard)
  @Get("/checkUser")
  async checkUser(@Req() req){
    return this.usersService.checkUser(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/setMpcDetails")
  async setMpcDetails(@Req() req, @Body() body:userMpcDto){
    return this.usersService.setMpcDetails(req, body);
  }

  @Post("/createWallet")
  async createWallet(@Body() body:createWalletDto){
    return this.usersService.createWallet(body);
  }

  @Get("/checkBalance")
  async checkBalance(@Query("account") account:string){
    return this.usersService.checkBalance(account);
  }

  @Post("/signTransaction")
  async signTransaction(@Body() body:signatureDto){
    return this.usersService.signTransaction(body);
  }

  @Post("/sendTransaction")
  async sendTransaction(@Body() body:signatureDto){
    return this.usersService.sendTransaction(body);
  }

  @Get("/getHashData")
  async getHashData(@Query("data") data:string){
    return this.usersService.getHashData(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/getMpcDetails")
  async getMpcDetails(@Req() req) {
    return this.usersService.getMpcDetails(req);
  }

  @Get('loggedIn')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.usersService.googleLogin(req,res);
  }

  @Get("/getCalldata")
  async getCallData(@Query("to") to:string, @Query("value", ParseIntPipe) value:number ){
    return this.usersService.getCallData(to, value);
  }

  @Get("/getOwner")
  getOwner(){
    return getOwner()
  }
}
