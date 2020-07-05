import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false })
	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule { }