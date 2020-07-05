import { Injectable} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(private authService: AuthService) {

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'TrollTheSecret' // TODO I see this in multiple places. Fix dis
		});

	}

	validate(payload: JwtPayload) {
		console.log("testing this validate function");

		return this.authService.validateUserByJwt(payload).pipe(
			map((user) => {
				console.log("testing if I got into map for validate");
				return user;
			})
		);
	}

}
