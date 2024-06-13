import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { SignUpUserDto } from '../domain/dto/sign-up.dto';
import { SignInUserDto } from '../domain/dto/sign-in.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { ResponseUserDbDto } from '../domain/dto/response-user-db.dto';
import { ValidRoles } from '../decorators/role-protect.decorator';
import { Auth } from '../decorators/auth.decorator';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { ResetPasswordDto } from '../domain/dto/reset-password.dto';
import { ChangePasswordDto } from '../domain/dto/change-password.dto';
import { QueryUserDto } from '../domain/dto/query-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signin(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('reset-password')
  resetPassword(@Body() input: ResetPasswordDto) {
    return this.authService.resetPassword(input);
  }
  @Get('confirm-reset-password')
  async confirmResetPassword(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.confirmResetPassword(token);

      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'static',
        'templates',
        'success-reset-password.html',
      );

      const html = fs.readFileSync(filePath, 'utf8');

      res.status(HttpStatus.OK).send(html);
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
    }
  }

  @Post('change-password')
  changePassword(@Body() input: ChangePasswordDto) {
    return this.authService.changePassword(input);
  }

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.authService.confirmEmail(token);

      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'static',
        'templates',
        'success-confirmation-email.html',
      );

      const html = fs.readFileSync(filePath, 'utf8');

      res.status(HttpStatus.OK).send(html);
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
    }
  }

  @Get('status')
  @Auth()
  checkStatus(@GetUser() user: ResponseUserDbDto) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('users')
  @Auth(ValidRoles.admin, ValidRoles.user)
  getUsers(@Query() queryDto: QueryUserDto) {
    return this.authService.getAllUsers(queryDto);
  }

  @Patch('user/:searchParam')
  @Auth(ValidRoles.admin, ValidRoles.user)
  updateUserState(
    @Param('searchParam') searchParam: string,
    @GetUser() user: ResponseUserDbDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(user, updateUserDto, searchParam);
  }
}
