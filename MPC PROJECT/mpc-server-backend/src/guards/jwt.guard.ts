import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard("jwt") {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
      if (!user) {
        throw new UnauthorizedException(
          "Oops! You need to be logged in first to do this."
        );
      }
      if (info instanceof TokenExpiredError) {
        throw new BadRequestException("Oops!, your session is expired");
      }
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException("Oops!, you need to login first");
      }
      return super.handleRequest(err, user, info, context, status);
    }
  }
  