import { NextFunction, Request, Response, Router } from 'express';
import { HttpMethods } from '../types/HttpMethods';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, HttpMethods>;
}
