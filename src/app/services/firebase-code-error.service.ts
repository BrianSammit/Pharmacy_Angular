import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/fire-base-code-error';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCodeErrorService {
  constructor() {}

  codeError(code: string) {
    switch (code) {
      // The email alreade exists
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // Pasword weak
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      // Invalid email
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';

      // Incorrect pasword
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';

      // The user does not exists
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';
      default:
        return 'Error desconocido';
    }
  }
}
