import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { LicenseService } from './license.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('license')
export class LicenseController {

  constructor(private licenseService: LicenseService) {

  }

  @Post()
  @UseGuards(AuthGuard())
  createLicense(@Body() createCrudDto: CreateCrudDto) {
    console.log("Hello");
    console.log(CreateCrudDto);
    console.log(CreateCrudDto instanceof CreateCrudDto);
    return this.licenseService.create(createCrudDto);
  }

  @Post('/editLicense')
  @UseGuards(AuthGuard())
  editLicense(@Body() createCrudDto: CreateCrudDto){
    return this.licenseService.editCrud(createCrudDto);
  }

}
