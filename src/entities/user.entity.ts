import { hash } from 'bcryptjs';

class UserEntity {
	private _password?: string;
	constructor(private readonly _email: string, private readonly _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string | undefined {
		return this._password;
	}

	public async setPassword(password: string, salt?: string): Promise<void> {
		if (salt) {
			this._password = await hash(password, Number(salt));
		}
	}
}

export default UserEntity;
