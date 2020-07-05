import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCrudDto {
	// TODO add public readonly to all things that are readonly
	// TODO add validation to this object so that the ! is a valid entry.

	@IsString()
	@IsNotEmpty()
	public readonly owner!: string;

	@IsString()
	@IsNotEmpty()
	public licenseID!: string;

	@IsDate()
	@IsNotEmpty()
	public updatedAt!: Date;

	@IsString()
	@IsOptional()
	public readonly crudDescription?: string;

}





