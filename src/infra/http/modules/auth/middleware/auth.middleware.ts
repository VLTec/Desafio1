import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export type AuthRequest = Request & { user?: User };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];
    
        if (!token) return res.status(401).json({ message: 'No token provided' });
    
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
          if (err) return res.status(401).json({ message: 'Invalid token' });
          req['userId'] = decoded.sub; 
          next();
        });
      }
}
