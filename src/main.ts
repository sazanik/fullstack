import { App } from './app';
import { LoggerService } from './helpers/logger/logger.service';
import { AuthController } from './services/auth/auth.controller';

const bootstrap = async (): Promise<void> => {
	const logger = new LoggerService();
	const app = new App(logger, new AuthController(logger));

	await app.init();
};

bootstrap().then(() => console.log('LISTEN TO YOU'));
