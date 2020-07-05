import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

	constructor(private userService: UserService) {

	}

	@Get()
	getHello(): string {
		return "DA HERRO";
	}

	@Post('/create')
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	// This route will require successfully passing our default auth strategy (JWT) in order
	// to access the route
	@Get('test')
	@UseGuards(AuthGuard())
	testAuthRoute() {
		return {
			message: 'You did it!'
		}
	}

}
