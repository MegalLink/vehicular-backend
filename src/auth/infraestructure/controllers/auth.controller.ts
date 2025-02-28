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
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from '../../application/auth.service';

import { GetUser } from '../decorators/get-user.decorator';
import { ResponseUserDbDto } from '../../application/dto/response-user-db.dto';
import { ValidRoles } from '../decorators/role-protect.decorator';
import { Auth } from '../decorators/auth.decorator';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { ResetPasswordDto } from '../../application/dto/reset-password.dto';
import { ChangePasswordDto } from '../../application/dto/change-password.dto';
import { QueryUserDto } from '../../application/dto/query-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { GoogleAuthGuard } from '../guards/google/google-auth.guard';
import { SignInResponseDto } from '../../application/dto/sign-in-response.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../../config/env.config';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { SignUpResponseDto } from '../../application/dto/sign-up-response.dto';
import { ResetPasswordResponseDto } from '../../application/dto/reset-password-response.dto';
import { ChangePasswordResponseDto } from '../../application/dto/change-password-response.dto';
import {
  ErrorBadRequestDto,
  ErrorUnauthorizedDto,
} from '../../../common/domain/dto/error.dto';
import { SignUpUserDto } from '../../application/dto/sign-up.dto';
import { SignInUserDto } from '../../application/dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully signed up',
    type: SignUpResponseDto,
  })
  @ApiBody({ type: SignUpUserDto })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorBadRequestDto,
  })
  signUp(@Body() signUpDto: SignUpUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorUnauthorizedDto,
  })
  signin(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
    type: ResetPasswordResponseDto,
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorBadRequestDto,
  })
  resetPassword(@Body() input: ResetPasswordDto) {
    return this.authService.resetPassword(input);
  }

  @Get('confirm-reset-password')
  @ApiOperation({ summary: 'Confirm password reset' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
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
  @Auth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password successfully changed',
    type: ChangePasswordResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorBadRequestDto,
  })
  changePassword(@Body() input: ChangePasswordDto) {
    return this.authService.changePassword(input);
  }

  @Get('confirm-email')
  @ApiOperation({ summary: 'Confirm user email' })
  @ApiResponse({ status: 200, description: 'Email successfully confirmed' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google login' })
  @ApiResponse({ status: 200, description: 'Google login' })
  async googleLogin() {
    return { message: 'Google login' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google login redirect' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with token' })
  async googleLoginRedirect(@Req() req: any, @Res() res: Response) {
    const user: SignInResponseDto = req.user;
    const frontendUrl = `${this.configService.get(EnvironmentConstants.front_url_redirect_login)}?token=${user.token}`;
    return res.redirect(frontendUrl);
  }

  @Get('status')
  @Auth()
  @ApiOperation({ summary: 'Check user status' })
  @ApiResponse({
    status: 200,
    description: 'User status',
    type: SignInResponseDto,
  })
  checkStatus(@GetUser() user: ResponseUserDbDto) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('users')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [ResponseUserDbDto],
  })
  getUsers(@Query() queryDto: QueryUserDto) {
    return this.authService.getAllUsers(queryDto);
  }

  @Patch('user/:searchParam')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Update user state' })
  @ApiResponse({
    status: 200,
    description: 'User state updated',
    type: ResponseUserDbDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  updateUserState(
    @Param('searchParam') searchParam: string,
    @GetUser() user: ResponseUserDbDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(user, updateUserDto, searchParam);
  }
}
