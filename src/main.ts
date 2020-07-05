import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';


async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors();

	const viewsPath = join(__dirname, '../views');
	app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'index' }));
	app.set('views', viewsPath);
	app.set('view engine', '.hbs');

	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(3000);
}
bootstrap();
