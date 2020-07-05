import { Test, TestingModule } from '@nestjs/testing';
import { LicenseController } from './license.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LicenseModule } from './license.module';
import { LicenseSchema } from './license.schema';
import { LicenseService } from './license.service';
import { CreateCrudDto } from './dto/create-crud.dto';

describe('License Controller', () => {
  let controller: LicenseController;

  const details: CreateCrudDto = {
    "owner": "test7",
    "licenseID": "",
    "updatedAt": new Date(),
    "crudDescription": ""
  }

  const editDetails: CreateCrudDto = {
    "owner": "test7",
    "licenseID": "3393x",
    "updatedAt": new Date(),
    "crudDescription": "test 1234"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LicenseModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
          secretOrPrivateKey: 'TrollTheSecret', // TODO fix dis
          signOptions: {
            expiresIn: 3600
          }
        }),
        MongooseModule.forRoot('mongodb://localhost/authexample'),
        MongooseModule.forFeature([{ name: 'License', schema: LicenseSchema }])
      ],
      controllers: [LicenseController],
      providers: [LicenseService]
    }).compile();

    controller = module.get<LicenseController>(LicenseController);
  });

  it('should be defined', () => {


    expect(controller).toBeDefined();
  });

  it('should create license', async () => {

    try {
      const license = await controller.createLicense(details).toPromise();
      console.log(license);
      expect(license).toBeDefined();
      expect(license.owner).toMatch("test7");
      expect(license.updatedAt).toBeDefined();
    } catch (e) {
      console.log(e);
    }

  });

  it('should edit license', async () => {

    try {
      const license = await controller.editLicense(editDetails);
      console.log(license);
      expect(license).toBeDefined();
      expect(license.owner).toMatch("test7");
      expect(license.updatedAt).toBeDefined();
      expect(license.crudDescription).toMatch("test 1234")
    } catch (e) {
      console.log(e);
    }
  });
});
