import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const generateToken = (
  payload: object,
  secret: Secret,
  expiresTime: string,
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresTime,
  });

  return token;
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
