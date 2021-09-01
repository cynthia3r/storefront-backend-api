import express from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;

    if (!authorizationHeader) throw new Error('JWT Token not provided so request cannot be processed');
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }
};

export default verifyAuthToken;
