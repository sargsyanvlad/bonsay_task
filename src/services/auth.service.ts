import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

class AuthService {
  async signToken(payload: any, secretKey: string, expiresIn: number) {
    return await jwt.sign(payload, secretKey, { expiresIn });
  }

  async signAccessToken(payload) {
    return this.signToken(payload, process.env.ACCESS_TOKEN_SECRET, 60000);
  }

  async verifyToken(token: string, secretKey: string) {
    return jwt.verify(token, secretKey);
  }

  async verifyAccessToken(token: string) {
    return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

export = new AuthService();
