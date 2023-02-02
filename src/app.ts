import express, { Express } from 'express';
import { Server } from 'http';

export class App {
	app: Express;
	server?: Server;
	port: number;

	constructor() {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);

		console.log('Server started on 8000 port');
	}
}
