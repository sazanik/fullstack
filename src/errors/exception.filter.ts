import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { LoggerService } from '@services/index';
import { HttpError } from '@errors/index';
import { NAMES } from '@constants/index';

interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(NAMES.LoggerService) private logger: LoggerService) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`{${err.message}}`);
			res.status(500).send({ error: err.message });
		}
		next();
	}
}

export default ExceptionFilter;
