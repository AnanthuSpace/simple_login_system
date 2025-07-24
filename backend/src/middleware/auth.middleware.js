import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRATION || "15m";
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRATION || "7d";

// Generate Access Token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: accessTokenExpire });
};

// Generate Refresh Token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: refreshTokenExpire });
};

// Middleware to verify token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers["x-refresh-token"];

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access denied. Token malformed." });
  }

  jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {

      if (!refreshToken) {
        return res.status(401).json({ message: "Access denied. Refresh token missing." });
      }

      jwt.verify(refreshToken, refreshTokenSecret, (refreshErr, refreshDecoded) => {
        if (refreshErr) {
          return res.status(401).json({ message: "Refresh token invalid or expired." });
        }
        console.log("user id ", refreshDecoded.userId)
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        req.userId = refreshDecoded.userId;
        next();
      });
    } else if (err) {
      return res.status(401).json({ message: "Access denied. Invalid access token." });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};
