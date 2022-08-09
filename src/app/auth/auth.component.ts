import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/Role';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoading: boolean = false
  error!: string

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    this.isLoading = true

    const email = form.value.email
    const password = form.value.password

    this.authService.login(email, password).subscribe(
      {
        next: resData => {
          this.isLoading = false
          this.navigateonLoginSuccess()
        },
        error: errorMessage => {
          this.isLoading = false
          this.error = errorMessage

        }
      })

    //form.reset()
  }

  navigateonLoginSuccess() {
    const user = this.authService.user.getValue()
    switch (user?.role) {
      case Role.User:
        this.router.navigate(['/home'])
        break
      case Role.Manager:
      case Role.Admin:
        this.router.navigate(['/admin/home'])
        break
      default:
        // TODO: Consider navigation in default case
        this.router.navigate(['/home'])
    }
  }

}
