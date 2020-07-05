
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LicenseModule } from './license/license.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		MongooseModule.forRoot('mongodb://localhost/authexample'),
		LicenseModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
