import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto'


@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post()
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.validateUserByPassword(loginUserDto);
	}


}
