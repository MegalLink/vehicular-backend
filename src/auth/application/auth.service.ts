import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpUserDto } from '../domain/dto/sign-up.dto';
import { hashSync, compareSync } from 'bcrypt';
import { IUserRepository } from '../domain/repository/auth.repository.interface';
import { UserRepository } from '../domain/repository/auth.repository';
import { SignInUserDto } from '../domain/dto/sign-in.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from '../domain/dto/sign-in-response.dto';
import { ResponseUserDbDto } from '../domain/dto/response-user-db.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../config/env.config';
import { IEmailRepository } from '../../notification/domain/repository/email.repository.interface';
import {
  EmailRepository,
  EmailRepositoryData,
} from '../../notification/domain/repository/email.repository';
import { ResetPasswordDto } from '../domain/dto/reset-password.dto';
import * as crypto from 'crypto';
import { ChangePasswordDto } from '../domain/dto/change-password.dto';
import { QueryUserDto } from '../domain/dto/query-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { ValidRoles } from '../decorators/role-protect.decorator';
import { GoogleUserDto } from '../domain/dto/google-user.dto';
import { SignUpResponseDto } from '../domain/dto/sign-up-response.dto';
import { ResetPasswordResponseDto } from '../domain/dto/reset-password-response.dto';
import { ChangePasswordResponseDto } from '../domain/dto/change-password-response.dto';

const saltRounds = 10;
const TokenConfirmed = 'TOKEN_CONFIRMED';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EmailRepository)
    private readonly _emailRepository: IEmailRepository,
    @Inject(UserRepository)
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpUserDto): Promise<SignUpResponseDto> {
    const token: string = this._getJWT({
      email: signUpDto.email,
      userName: signUpDto.userName,
      roles: [ValidRoles.user], // Default role on register
    });
    try {
      const { password, ...userData } = signUpDto;

      await this._emailRepository.sendEmail(
        this._confirmationEmailData(signUpDto.email, token),
      );
      const user = await this._userRepository.create({
        ...userData,
        password: hashSync(password, saltRounds),
        confirmationToken: token,
      });
      return {
        message: `Un email de confirmación ha sido enviado ${user.email}, porfavor revisa tu bandeja de entrada`,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        const user = await this._userRepository.findOne({
          email: signUpDto.email,
        });

        if (
          user &&
          !user.isEmailConfirmed &&
          user.confirmationToken !== TokenConfirmed
        ) {
          await this._userRepository.update(user._id, {
            confirmationToken: token,
          });
        }

        const message = user
          ? `Ya existe una cuenta con el email ${user.email}`
          : `Porfavor confirme su registro, un email ha sido enviado a su correo electrónico`;
        throw new BadRequestException(message);
      }

      throw error;
    }
  }

  async signIn(signInDto: SignInUserDto): Promise<SignInResponseDto> {
    const { password, email } = signInDto;
    const user = await this._userRepository.findOne({
      email: email,
      isEmailConfirmed: true,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    if(!user.password){
      throw new UnauthorizedException('Esta cuenta esta registrada con google');
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    return this._createAuthResponse(user);
  }

  async confirmResetPassword(token: string): Promise<void> {
    const payload = this._jwtService.verify(token, {
      secret: this._configService.get<string>(EnvironmentConstants.jwt_secret),
    });

    const user = await this._userRepository.findOne({
      email: payload.email,
      confirmationToken: token,
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    const temporaryPassword = this._generateTemporaryPassword();

    user.password = hashSync(temporaryPassword, saltRounds);
    user.confirmationToken = TokenConfirmed;
    await this._userRepository.update(user._id, user);

    await this._emailRepository.sendEmail(
      this._temporaryPasswordEmailData(user.email, temporaryPassword),
    );
  }

  async confirmEmail(token: string): Promise<object> {
    const payload = this._jwtService.verify(token, {
      secret: this._configService.get(EnvironmentConstants.jwt_secret),
    });

    const user = await this._userRepository.findOne({
      email: payload.email,
      confirmationToken: token,
    });

    if (!user) {
      throw new UnauthorizedException('Token expirado');
    }

    user.isEmailConfirmed = true;
    user.confirmationToken = TokenConfirmed;
    await this._userRepository.update(user._id, user);

    return { message: 'Email confirmado exitosamente' };
  }

  async checkAuthStatus(user: ResponseUserDbDto) {
    return this._createAuthResponse(user);
  }

  async getAllUsers(filters: QueryUserDto): Promise<ResponseUserDbDto[]> {
    const query: Record<string, any> = {};

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }
    if (filters.rol !== undefined) {
      query.roles = { $in: filters.rol };
    }

    if (filters.email) {
      query.email = filters.email;
    }

    return await this._userRepository.findAll(query);
  }

  async updateUser(
    user: ResponseUserDbDto,
    userUpdate: UpdateUserDto,
    userUpdateID: string,
  ): Promise<ResponseUserDbDto> {
    if (user._id === userUpdateID) {
      throw new UnauthorizedException('No puedes actualizar tu propio usuario');
    }

    if (userUpdate.isActive !== undefined) {
      const userToUpdate = await this._userRepository.findOne({
        _id: userUpdateID,
      });
      if (userToUpdate && !userToUpdate.roles.includes(ValidRoles.employee)) {
        throw new UnauthorizedException(
          'Solo puedes cambiar el estado de usuarios que sean empleados',
        );
      }
    }

    return await this._userRepository.update(userUpdateID, userUpdate);
  }

  async resetPassword(
    input: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto> {
    const email = input.email;
    const user = await this._userRepository.findOne({
      email: email,
      isEmailConfirmed: true,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    if (!user.password) {
      throw new UnauthorizedException('Esta cuenta esta registrada con google');
    }

    user.confirmationToken = this._getJWT({
      email: email,
      userName: user.userName,
      roles: user.roles,
    });
    await this._userRepository.update(user._id, user);

    await this._emailRepository.sendEmail(
      this._recoverPasswordEmailData(email, user.confirmationToken),
    );

    return {
      message: `Se ha enviado un email de confirmación de recuperación de contraña ${user.email}, porfavor revise sus mensajes`,
    };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const user = await this._userRepository.findOne({
      email: changePasswordDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    if (!compareSync(changePasswordDto.password, user.password)) {
      throw new UnauthorizedException('Contraseña invalida');
    }

    if (compareSync(changePasswordDto.newPassword, user.password)) {
      throw new BadRequestException('La nueva contraseña no puede ser igual a la actual');
    }

    user.password = hashSync(changePasswordDto.newPassword, saltRounds);
    await this._userRepository.update(user._id, user);
    return { message: 'Contraseña cambiada exitosamente' };
  }

  async validateGoogleUser(user: GoogleUserDto): Promise<SignInResponseDto> {
    const user_db = await this._userRepository.findOne({
      email: user.email,
    });

    if (user_db) {
      return this._createAuthResponse(user_db);
    }
    const new_user = {
      email: user.email,
      roles: [ValidRoles.user],
      userName: user.displayName,
      isEmailConfirmed: true,
      isActive: true,
    };

    const create_user = await this._userRepository.create(new_user);
    return this._createAuthResponse(create_user);
  }

  private _createAuthResponse(user: ResponseUserDbDto): SignInResponseDto { 
    return {
      email: user.email,
      roles: user.roles,
      userName: user.userName,
      token: this._getJWT({
        email: user.email,
        userName: user.userName,
        roles: user.roles,
      }),
      _id: user._id,
    };
  }

  private _generateTemporaryPassword(): string {
    const passwordLen = 8;
    const password = crypto.randomBytes(passwordLen).toString('hex');
    return this._capitalizeFirstLetter(password);
  }

  private _temporaryPasswordEmailData(
    email: string,
    temporaryPassword: string,
  ): EmailRepositoryData {
    return {
      to: [email],
      subject: 'Recuperación Contraseña',
      body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Contraseña temporal</h2>
          <p>Se ha reseteado su contraseña. Aquí esta tu nuevo password temporal:</p>
          <p><strong>${temporaryPassword}</strong></p>
          <p>Porfavor usa este password para ingresar a tu cuenta y cambia la contraseña inmediatamente.</p>
        </div>
      `,
    };
  }

  private _recoverPasswordEmailData(
    email: string,
    token: string,
  ): EmailRepositoryData {
    const resetPasswordUrl = `${this._configService.get<string>(EnvironmentConstants.rest_api_url)}auth/confirm-reset-password?token=${encodeURIComponent(token)}`;
    return {
      to: [email],
      subject: 'Confirmar resetear contraseña',
      body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Confirmar resetear contraseña</h2>
          <p>Da clic sobre el boton debajo para confirmar el reseteo de contraseña:</p>
          <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirmar resetear contraseña</a>
          <p>Si el boton no funciona, copia y pega el enlace en tu navegador:</p>
          <p><a href="${resetPasswordUrl}" style="color: #007bff;">${resetPasswordUrl}</a></p>
          <br>
          <p>Si no solicitaste el cambio de contraseña, ignora este email.</p>
        </div>
      `,
    };
  }

  private _confirmationEmailData(
    email: string,
    token: string,
  ): EmailRepositoryData {
    const confirmEmailUrl = `${this._configService.get(EnvironmentConstants.rest_api_url)}auth/confirm-email?token=${encodeURIComponent(token)}`;

    return {
      to: [email],
      subject: 'Confirmar email',
      body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Confirmar email</h2>
        <p>Gracias por registrarse. Porfavor confirme la creación de su cuenta dando clic en el enlace boton de abajo:</p>
        <a href="${confirmEmailUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        <p>Si el boton no funciona, copia y pega el enlace en tu navegador:</p>
        <p><a href="${confirmEmailUrl}" style="color: #007bff;">${confirmEmailUrl}</a></p>
        <br>
        <p>Si no solicitaste registrar tu cuenta, ignora este email.</p>
      </div>
    `,
    };
  }

  private _capitalizeFirstLetter(str: string): string {
    return str.replace(/([a-zA-Z])/, (match) => match.toUpperCase());
  }
  private _getJWT(payload: JwtPayload) {
    return this._jwtService.sign(payload);
  }
}
