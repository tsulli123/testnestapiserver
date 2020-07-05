import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';
import { defer, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { UnauthorizedException } from '@nestjs/common';

export const UserSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	licenses: [String]
});

// Warning that hidden logic creates confusion
UserSchema.pre<User>('save', async function save() {

	if (!this.isModified('password')) {
		return;
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = function (attempt) : Observable<User> {
	return defer(() => bcrypt.compare(attempt, this.password)).pipe(

		tap(value => {
			if (!value) {
				throw new UnauthorizedException();
			}
		}),
		mapTo(this),
	);
};
