import { Document } from 'mongoose';

export interface License extends Document {
	owner: string;
	licenseID: string;
	updatedAt: string;
	crudDescription: Date;
}
