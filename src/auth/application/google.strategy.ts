import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { EnvironmentConstants } from '../../config/env.config';
import { Strategy } from 'passport-google-oauth20';
import { Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

export class GooggleStragety extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(ConfigService)
    _configService: ConfigService,
    @Inject(AuthService) private readonly _authService: AuthService,
  ) {
    super({
      clientID: _configService.get(EnvironmentConstants.google_client_id),
      clientSecret: _configService.get(
        EnvironmentConstants.google_client_secret,
      ),
      callbackURL: _configService.get(EnvironmentConstants.google_redirect_url),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const { emails, displayName } = profile;
    try {
      const user = await this._authService.validateGoogleUser({
        email: emails![0].value,
        displayName,
      });

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
