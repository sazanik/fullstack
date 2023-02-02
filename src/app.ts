import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './helpers/logger/logger.service';
import { AuthController } from './services/auth/auth.controller';

export class App {
	app: Express;
	server?: Server;
	port: number;
	logger: LoggerService;
	authController: AuthController;

	constructor(logger: LoggerService, authController: AuthController) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.authController = authController;
	}

	useRoutes(): void {
		this.app.use('/', this.authController.router);
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);

		this.useRoutes();
		this.logger.info('Server started on 8000 port');
	}
}
