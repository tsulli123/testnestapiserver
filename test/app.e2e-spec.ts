import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const detail = "test15";
  const username = detail;
  const pw = detail;
  let jwt: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/getHello')
      .expect(200)
      .expect('Hello World!');
  });

  it('create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        'username': username,
        'password': pw,
      })
      .expect(201);
    console.log(response.body);
  });

  it('create user fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        'username': username,
        'password': pw,
      })
      .expect(500);
    console.log(response.body);
  });

  it('login to user account, success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({
        'username': username,
        'password': pw,
      })
      .expect(201)
      .expect(({body}) =>{
        expect(body.token).toBeDefined()
      });
    jwt = response.body.token
    console.log(jwt);
  });

  it('Check login access to page', async () => {
    console.log("BEFORE THE CALL");
    console.log(jwt);
    const response = await request(app.getHttpServer())
      .get('/users/test')
      .set("Authorization",  `Bearer ${jwt}`)
      .expect(200);
    console.log("I AM HERE");
    console.log(response.body);
  });



});
