import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { LoginUserDto} from '../user/dto/login-user.dto';

describe('Auth Controller', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return login jwt token', async () => {
    const details: LoginUserDto={
      "username": "test7",
      "password": "test7"
    };

    try {
      const login = await controller.login(details).toPromise();
      console.log(login);
      expect(login).toBeDefined();
      expect(login.expiresIn).toEqual(3600);
      expect(login.token).toBeDefined();
    } catch (e){
      console.log(e);
    }

  });

  it('should return error', async () => {
    const details: LoginUserDto={
      "username": "test7",
      "password": "test"
    };
    expect.assertions(1);

    try {
      await controller.login(details).toPromise();
    } catch (e) {
      console.log(e);
      expect(e).toBeDefined();
    }

  });

  
});
