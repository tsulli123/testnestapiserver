import { Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('/getHello')
	getHello(): string {
		return this.appService.getHello();
	}

	@Get()
	@Render('login')
	root() {
		return;
	}
}
