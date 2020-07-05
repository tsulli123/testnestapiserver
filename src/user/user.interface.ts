import { Document } from 'mongoose';
import { Observable } from 'rxjs';

export interface User extends Document {
	username: string;
	password: string;
	licenses: string[];
	checkPassword(attempt: string): Observable<this>;
}
