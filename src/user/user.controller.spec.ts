import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

describe('User Controller', () => {
  let controller: UserController;

  const details: CreateUserDto={
    "username": "test703",
    "password": "test703"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://localhost/authexample'),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false })
      ],
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Hello', () => {
    expect(controller.getHello()).toMatch("DA HERRO");
  });

  it('should get Hello', () => {
    expect(controller.getHello()).toMatch("DA HERRO");
  });

  it('should get You Did it!', () => {
    expect(controller.testAuthRoute().message).toMatch("You did it!");
  });

  it('should create new user and return user account', async () => {

    try {
      const user = await controller.create(details).toPromise();
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.username).toMatch(details.username);

    } catch (e){
      console.log(e);
    }
  });

  it('should get error on creating user', async () => {

    try {
      await controller.create(details).toPromise();

    } catch (e){
      console.log(e);
      expect(e).toBeDefined();
    }
  });
});
