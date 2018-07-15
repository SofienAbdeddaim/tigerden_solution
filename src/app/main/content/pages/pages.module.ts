import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';
import { LockModule } from './authentication/lock/lock.module';
import { MailConfirmModule } from './authentication/mail-confirm/mail-confirm.module';

@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        LockModule,
        MailConfirmModule,
    ]
})
export class FusePagesModule
{

}
