import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule.register({
          secretOrPrivateKey: 'TrollTheSecret', // TODO fix dis
          signOptions: {
            expiresIn: 3600
          }
        }),
        MongooseModule.forRoot('mongodb://localhost/authexample'),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
