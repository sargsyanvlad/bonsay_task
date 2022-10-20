import * as faker from "faker";
import { app } from "../src/server";
import chai from "chai";
import { before } from "mocha";
const { expect } = chai;
import chaiHttp from "chai-http";
import { models } from "../src/db";
import * as bcrypt from "bcrypt";

describe("API tests", () => {
  const adminPassword = "12345678";
  const salt = bcrypt.genSaltSync(10);
  const email = faker.internet.email().toLowerCase();
  const hashedPassword = bcrypt.hashSync(adminPassword, salt);
  let adminToken = "";
  const admin = {
    name: faker.name.firstName(),
    email,
    password: hashedPassword,
    isAdmin: true,
  };
  before(async () => {
    chai.use(chaiHttp);
    await models.Staff.create(admin);
  });

  describe("GET /health", () => {
    it("Should return health", async () => {
      const res = await chai.request(app).get("/health");
      expect(res.status).to.be.equal(200);
    });
  });

  describe("GET /list", async () => {
    it("Should return 404 not found ", async () => {
      const res = await chai.request(app).get("/list");
      expect(res.status).to.be.equal(404);
    });
  });

  describe("POST /staff/", async () => {
    it("Should return 200 Status for /staff/signin", async () => {
      const res = await chai
        .request(app)
        .post("/staff/signin")
        .set("Content-type", "application/json")
        .send({
          email,
          password: adminPassword,
        });

      expect(res.status).to.be.equal(200);

      expect(res.body?.accessToken).to.be.an("string");
      adminToken = res.body?.accessToken;
    });

    it("Should return 200 Status, and create new Employee", async () => {
      const res = await chai
        .request(app)
        .post("/staff/add")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          email: faker.internet.email().toLowerCase(),
          name: faker.name.firstName().toLowerCase(),
          password: adminPassword,
        });
      expect(res.status).to.be.equal(200);
    });

    it("Should return 200 Status, and get list of staff", async () => {
      const res = await chai
        .request(app)
        .get("/staff")
        .set("Authorization", `Bearer ${adminToken}`)
        .send();
      expect(res.status).to.be.equal(200);
      expect(res?.body?.employees).to.be.an("Array");
    });

    it("Should return 200 Status, and get list of staff", async () => {
      const res = await chai
        .request(app)
        .get("/staff/search?text=a")
        .set("Authorization", `Bearer ${adminToken}`)
        .send();
      expect(res.status).to.be.equal(200);
      expect(res?.body?.employee).to.be.an("Array");
    });
  });
});
