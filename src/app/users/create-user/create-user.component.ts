import { Component, ElementRef, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Role } from '../../models/Role'
import { UserService } from '../user.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  isUserCreated = false
  errMessage: string | null = null

  isCollapsed = true

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onCreateUser(createUserForm: NgForm) {
    const { name, email, password } = createUserForm.value
    //console.log(`name: ${name}, email: ${email}, password: ${password}`)
    const newWorker = new Worker(name)
    this.userService.create({
      displayName: name,
      email: email,
      password: password,
      role: Role.User,
      userData: newWorker
    }).subscribe(
      {
        next: resData => { // resData Object - {uid: string}
          //console.log(resData)

          this.isUserCreated = true
          this.errMessage = null
          createUserForm.reset()

          
        }
      }
    )
  }

  getUser(uid: string) {
    this.userService.user$(uid).subscribe(
      result => {
        console.log(result)
      }
    )
  }
}
