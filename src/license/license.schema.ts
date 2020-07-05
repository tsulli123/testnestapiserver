import * as mongoose from 'mongoose';

export const LicenseSchema = new mongoose.Schema({
	owner: {
		type: String,
		required: true
	},
	licenseID: {
		type: String,
		required: true
	},
	updatedAt: {
		type: Date
	},
	crudDescription: {
		type: String
	}
});
