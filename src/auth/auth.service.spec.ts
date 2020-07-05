import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { AuthController } from './auth.controller';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return login jwt token', async () => {
    const details: LoginUserDto={
      "username": "test7",
      "password": "test7"
    };

    try {
      const login = await service.validateUserByPassword(details).toPromise();
      console.log(login);
      expect(login).toBeDefined();
      expect(login.expiresIn).toEqual(3600);
      expect(login.token).toBeDefined();
    } catch (e){
      console.log(e);
    }

  });

  it('should return login fail error', async() => {
    const details: LoginUserDto={
      "username": "qwerqwer",
      "password": "qwerqwer"
    };

    expect.assertions(1);

    try {
      await service.validateUserByPassword(details).toPromise();
    } catch (e) {
      console.log(e);
      expect(e).toBeDefined();
    }

  });

  it('should return jwt token', async () => {
    const payload: JwtPayload={
      "username": "test7"
    };

    expect.assertions(2);

    try {
      const login = await service.validateUserByJwt(payload).toPromise();
      console.log(login)
      expect(login).toBeDefined();
    } catch (e) {
      console.log(e);
      expect(e).toBeDefined();
    }

  });

  it('should return error with jwt token creation', async () => {
    const payload: JwtPayload={
      "username": "qwerqwerqwer"
    };

    expect.assertions(1);

    try {
      const login = await service.validateUserByJwt(payload).toPromise();
      console.log(login)
      expect(login).toBeDefined();
    } catch (e) {
      console.log(e);
      expect(e).toBeDefined();
    }

  });


});
