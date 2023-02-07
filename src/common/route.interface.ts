import { NextFunction, Request, Response, Router } from 'express';
import { HttpMethods } from '../types/HttpMethods';
import { IMiddleware } from '../helpers/validate/middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, HttpMethods>;
	middlewares?: IMiddleware[];
}
