import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ResponseUserDbDto } from '../domain/dto/response-user-db.dto';
import { JwtPayload } from './jwt-payload.interface';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../domain/repository/auth.repository';
import { IUserRepository } from '../domain/repository/auth.repository.interface';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private readonly _userRepository: IUserRepository,
    _configService: ConfigService,
  ) {
    super({
      secretOrKey: _configService.get(EnvironmentConstants.jwt_secret),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<ResponseUserDbDto> {
    try {
      const { email } = payload;

      const user = await this._userRepository.findOne({ email });
      if (!user.isActive) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException)
        throw new UnauthorizedException('Token no valido');
    }
    throw new InternalServerErrorException('Algo salio mal');
  }
}
