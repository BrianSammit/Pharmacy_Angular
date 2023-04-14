import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.formReg =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

   register() {
    const email = this.formReg.value.email;
    const password = this.formReg.value.password;
    const repeatPassword = this.formReg.value.repeatPassword;

    console.log(this.formReg);
    if (password !== repeatPassword) {
      this.toastr.error(
        'The password provided must be equal',
        'Error'
      );
      return;
    }

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verifyEmail();
      })
      .catch((error) => {
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }

  verifyEmail() {
    this.afAuth.currentUser
    .then((user) => user?.sendEmailVerification())
    .then(() => {
      this.toastr.info(
        'We send you a verify email',
        'Verify email'
      );
      this.router.navigate(['/login']);
    });
  }


}
