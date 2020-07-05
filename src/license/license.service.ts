import { Injectable} from '@nestjs/common';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { License } from './license.interface';
import { CreateCrudDto } from './dto/create-crud.dto';
import { defer, Observable } from 'rxjs';

@Injectable()
export class LicenseService {

	constructor(@InjectModel('License') private crudModel: Model<License>) { }

	create(createCrudDto: CreateCrudDto) {
		return defer (() => {
			createCrudDto.licenseID = makeid();
			createCrudDto.updatedAt = new Date();
			const createdCrud = new this.crudModel(createCrudDto);
			return createdCrud.save();
		})
	}

	findAll(owner: string): Observable<License[]> {
		return defer(()=>this.crudModel.find({ owner: owner }).exec());
	}

	findAllByTwenty(owner: string, page: number): Observable<License[]> {
		return defer(()=> {

			return this.crudModel.find({ owner: owner }).limit(20).skip(page * 20).exec();

		});
	}

	editCrud(createCrudDto: CreateCrudDto) {

			createCrudDto.updatedAt = new Date();
			console.log(createCrudDto);
			return this.crudModel.findOneAndUpdate({"licenseID": createCrudDto.licenseID}, { createCrudDto }).exec()
				.then( data => {
					if (!data){
						throw new ReferenceError("The License that has been specified does not exist.");
					}
					return data;
				})
				.catch( e => {
					return e;
				})

	}

}

function makeid() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
