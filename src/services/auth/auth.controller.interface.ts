import { NextFunction, Response, Request } from 'express';

export interface IAuthController {
	login: (reg: Request, res: Response, next: NextFunction) => void;
	register: (reg: Request, res: Response, next: NextFunction) => void;
}
