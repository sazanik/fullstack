import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { HttpError } from './http-error.class';
import { ILogger } from '../helpers/logger/logger.interface';
import { NAMES } from '../types/names';

export interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(NAMES.ILogger) private logger: ILogger) {}

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
