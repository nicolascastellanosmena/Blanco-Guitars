/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private userService: UsersService,
    @Inject() private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async registrarNuevoUsuario(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async iniciarSesion(@Body() usuario: CreateUserDto) {
    const elUsuario = await this.userService.findByUsername(usuario.username);
    if (!elUsuario) {
      throw new HttpException('Acceso no válido', HttpStatus.NOT_FOUND);
    }

    const passOk = await bcryptjs.compare(usuario.password, elUsuario.password);
    if (!passOk) {
      throw new HttpException('Acceso no válido', HttpStatus.NOT_FOUND);
    }

    const payload = { username: elUsuario.username, rol: elUsuario.rol };
    let miToken: string;
    let miRefreshToken: string;

    if (elUsuario.rol === 'admin') {
      miToken = await this.jwtService.signAsync(payload, { expiresIn: '12h' });
      miRefreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    } else if (elUsuario.rol === 'user') {
      miToken = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
      miRefreshToken = await this.jwtService.signAsync(payload, { expiresIn: '1h' });
    } else {
      throw new HttpException('Rol no reconocido', HttpStatus.FORBIDDEN);
    }

    return { access_token: miToken, refresh_token: miRefreshToken };
  }

  @Post('/refresh')
  async refrescarToken(@Body() body) {
    const actualRefreshToken = body.refresh_token;
    if (!actualRefreshToken) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(actualRefreshToken);

      const newPayload = { username: payload.username, rol: payload.rol };
      const miToken = await this.jwtService.signAsync(newPayload);
      const miRefreshToken = await this.jwtService.signAsync(newPayload, { expiresIn: '1h' });

      return { access_token: miToken, refresh_token: miRefreshToken };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
