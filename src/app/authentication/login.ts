import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Authentication} from './authentication';


@Component({
    selector: 'login',
    directives: [FORM_DIRECTIVES, NgIf],
    templateUrl: '/app/authentication/login.html',
    providers: [FormBuilder],
})

export class Login {
    form: ControlGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
        this.form = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    button() {
        console.log(this.auth.isExpired())
    }
    check() {

    }


    onSubmit(value: any) {
        this.auth.login(value.email, value.password)
            .subscribe(
            (token: any) => this.router.navigate(['/']),
            () => { this.error = true; }
            );
    }
}
