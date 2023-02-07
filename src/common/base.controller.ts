import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { IControllerRoute } from './route.interface';
import { ILogger } from '../helpers/logger/logger.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	private readonly _logger: ILogger;

	constructor(logger: ILogger) {
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
