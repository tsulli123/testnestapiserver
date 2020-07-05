import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	// TODO readonly and validation
	@IsString()
	@IsNotEmpty()
	readonly username!: string;

	@IsString()
	@IsNotEmpty()
	readonly password!: string;
}
