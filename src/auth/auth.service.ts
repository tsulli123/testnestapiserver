import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/user.interface';
import { flatMap, map } from 'rxjs/operators';


@Injectable()
export class AuthService {

	constructor(private userService: UserService, private jwtService: JwtService) {

	}

	validateUserByPassword(loginAttempt: LoginUserDto) {

		// This will be used for the initial login
		return this.userService.findOneByUsername(loginAttempt.username).pipe(
			flatMap((user) => {
				if (!user) {
					throw new UnauthorizedException();
				}

				return user.checkPassword(loginAttempt.password);
			}),
			map(user => this.createJwtPayload(user)),
		);

		// teardown logic? TODO lookup what this is
	}

	validateUserByJwt(payload: JwtPayload) {

		console.log("test")
		console.log(payload)

		// This will be used when the user has already logged in and has a JWT
		return this.userService.findOneByUsername(payload.username).pipe(
			map((user) =>{
				console.log(user)
				if (!user){
					throw new UnauthorizedException();
				}
				this.createJwtPayload(user);
			})
		);

	}

	createJwtPayload(user: User) {

		const data: JwtPayload = {
			username: user.username
		};

		const jwt = this.jwtService.sign(data);

		return {
			expiresIn: 3600,
			token: jwt
		}

	}

}
