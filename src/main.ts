import { Container, ContainerModule, interfaces } from 'inversify';

import { NAMES } from '@constants/index';
import { App } from './app';
import { ExceptionFilter } from '@errors/index';
import {
	AuthController,
	AuthRepository,
	AuthService,
	ConfigService,
	LoggerService,
} from '@services/index';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ExceptionFilter>(NAMES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<LoggerService>(NAMES.LoggerService).to(LoggerService).inSingletonScope();
	bind<AuthController>(NAMES.AuthController).to(AuthController).inSingletonScope();
	bind<AuthService>(NAMES.AuthService).to(AuthService).inSingletonScope();
	bind<AuthRepository>(NAMES.AuthRepository).to(AuthRepository).inSingletonScope();
	bind<ConfigService>(NAMES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(NAMES.App).to(App);
});

const bootstrap = (): { app: App; appContainer: Container } => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(NAMES.App);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
