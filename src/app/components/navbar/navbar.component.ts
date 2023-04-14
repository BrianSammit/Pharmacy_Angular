import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isSession: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {
    this.isSession = false;
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.isSession = !!user;
    });
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/register']);
      })
      .catch(error => console.log(error));
  }

}
