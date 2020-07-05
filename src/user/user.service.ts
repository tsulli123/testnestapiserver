import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable, defer } from 'rxjs';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private userModel: Model<User>) { }

	create(createUserDto: CreateUserDto) {

		return defer(() => {
			const createdUser = new this.userModel(createUserDto);
			return createdUser.save();
		});
	}

	findAll(): Observable<User[]> {
		return defer(() => this.userModel.find().exec());
	}

	findOneByUsername(username: string): Observable<User | null> {
		return defer(() => this.userModel.findOne({ username: username }).exec());
	}
}
