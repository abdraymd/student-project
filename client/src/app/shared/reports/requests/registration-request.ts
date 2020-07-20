export class RegistrationRequest {
	username: string
	name: string
	surname: string
	email: string
	password: string
	roles: string[]

	constructor(username: string, name: string, surname: string, email: string, password: string) {
		this.username = username
		this.name = name
		this.surname = surname
		this.email = email
		this.password = password
		this.roles = ['user']
	}
}
