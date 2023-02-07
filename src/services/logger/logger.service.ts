import { injectable } from 'inversify';
import { Logger } from 'tslog';
import 'reflect-metadata';

interface ILoggerService {
	logger: unknown;
	info: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}

@injectable()
class LoggerService implements ILoggerService {
	public logger: Logger<unknown>;

	constructor() {
		this.logger = new Logger({
			name: 'MAIN',
		});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}

export default LoggerService;
