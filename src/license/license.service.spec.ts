import { Test, TestingModule } from '@nestjs/testing';
import { LicenseService } from './license.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LicenseSchema } from './license.schema';

describe('LicenseService', () => {
  let service: LicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'TrollTheSecret', // TODO fix dis
          signOptions: {
            expiresIn: 3600
          }
        }),
        MongooseModule.forRoot('mongodb://localhost/authexample'),
        MongooseModule.forFeature([{ name: 'License', schema: LicenseSchema }]),
      ],
      providers: [LicenseService],
    }).compile();

    service = module.get<LicenseService>(LicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
