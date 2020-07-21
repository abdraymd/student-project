import { Component, Input } from '@angular/core'
import { UserService } from '../shared/services/user.service'
import { TokenService } from '../shared/services/token.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { PasswordChangeComponent } from '../password-change/password-change.component'

@Component({
	selector: 'account-options',
	templateUrl: './account-options.component.html',
	styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent {
	@Input() userEmail: string
	emailUpdated: boolean = false
	passwordUpdated: boolean = false

	constructor(
		private userService: UserService,
		private token: TokenService,
		private dialog: MatDialog
	) {
		this.userService.listen().subscribe(response => {
			this.passwordUpdated = true
		})
	}

	updateEmail() {
		const userId = parseInt(this.token.getUserId())

		this.userService.updateEmail(userId, this.userEmail).subscribe(response => {
			this.emailUpdated = true
		})
	}

	onPasswordChange() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		this.dialog.open(PasswordChangeComponent, dialogConfig)
	}
}
