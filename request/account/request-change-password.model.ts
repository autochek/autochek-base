

export class RequestChangePassword {
	public CurrentPassword: string;
	public NewPassword: string;
	public NewConfirmPassword: string;

	constructor(Password?: string, NewPassword?: string, NewConfirmPassword?: string) {
		this.CurrentPassword = Password;
		this.NewPassword = NewPassword;
		this.NewConfirmPassword = NewConfirmPassword;
	}
}


