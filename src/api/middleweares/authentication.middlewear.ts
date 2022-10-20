import authService from "../../services/auth.service";

class AuthenticationMiddleware {
  async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        res.status(401).send("Token not provided");
      }
      const token = authorization.split("Bearer ")[1].trim();

      if (!token) {
        res.status(401).send("Token not provided");
      }
      const isAccessTokenVerified = await authService.verifyAccessToken(token);
      if (!isAccessTokenVerified) {
        res.status(401).send("Invalid token");
      }

      req.payload = isAccessTokenVerified;
      req.accessToken = token;
      return next();
    } catch (e) {
      return next(e);
    }
  }

  async isAdmin(req, res, next) {
    if (req.payload?.user && req.payload.user.isAdmin) {
      return next();
    }
    res.status(409).send("Unauthorized");
  }
}

export default new AuthenticationMiddleware();
