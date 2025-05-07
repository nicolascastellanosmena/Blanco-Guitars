/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( @Inject()  private jwtService:JwtService){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extraerTokenDeLaCabecera(request);
        if(!token) throw new UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
            request["user"] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extraerTokenDeLaCabecera(req: Request): string | undefined {
        const [tipo, token] = req.headers.authorization?.split(' ') ?? [];
        return tipo === "Bearer" ? token : undefined;
    }
}
