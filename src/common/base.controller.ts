import { NextFunction, Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { HTTP_METHODS } from '@constants/index';
import { IMiddleware } from '@helpers/index';
import { LoggerService } from '@services/index';

interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, HTTP_METHODS>;
	middlewares?: IMiddleware[];
}

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	private readonly _logger: LoggerService;

	constructor(logger: LoggerService) {
		this._router = Router();
		this._logger = logger;
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');

		return res.status(code).json(message);
	}

	public sendOk<T>(res: Response, message: T): Response {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			const { path, func, method } = route;
			const boundFunc = func.bind(this);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const pipeline = middleware ? [...middleware, boundFunc] : boundFunc;

			this._logger.info(`${method} ${path}`);
			this.router[route.method](path, pipeline);
		}
	}
}

export default BaseController;
