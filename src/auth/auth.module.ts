import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { User, UserSchema } from './domain/entities/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './infraestructure/persistence/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/config/env.config';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { NotificationModule } from '../notification/notification.module';
import { GooggleStragety } from './infraestructure/strategies/google.strategy';

const STRATEGY = 'jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    GooggleStragety,
    ConfigService,
  ],
  imports: [
    ConfigModule,
    NotificationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: STRATEGY }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get(EnvironmentConstants.jwt_secret),
          signOptions: {
            expiresIn: configService.get(EnvironmentConstants.jwt_expires_in),
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
