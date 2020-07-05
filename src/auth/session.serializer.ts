import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { defer } from 'rxjs';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: any) {
		return defer(() => {
			return user;
		})
	}
	deserializeUser(payload: any) {
		return defer(() => {
			return payload;
		})
	}
}
