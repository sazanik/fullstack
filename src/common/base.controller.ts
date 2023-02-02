import { Response, Router } from 'express';

import { LoggerService } from '../helpers/logger/logger.service';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerService) {
		this._router = Router();
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

			this.logger.info(`${method} ${path}`);
			this.router[route.method](path, boundFunc);
		}
	}
}
