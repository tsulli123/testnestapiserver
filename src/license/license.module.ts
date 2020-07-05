import { Module } from '@nestjs/common';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LicenseSchema } from './license.schema';
import { PassportModule } from '@nestjs/passport';


@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		MongooseModule.forFeature([{ name: 'License', schema: LicenseSchema }])
	],
	controllers: [LicenseController],
	providers: [LicenseService]
})
export class LicenseModule { }
