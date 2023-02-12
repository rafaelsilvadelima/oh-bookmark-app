import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Usuarios } from '../interfaces/usuarios';
import { GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) { }

  public autenticarGoogle(): Observable<any> {
    const googleAuth = new GoogleAuthProvider();
    const promessa = this.auth.signInWithPopup(googleAuth);
    return from(promessa).pipe(
      catchError(error => {
        this.toastr.error("Erro ao auntenticar com o Google");
        return EMPTY;
      })
    )
  }

  public autenticarComEmailSenha(user: User): Observable<any> {
    const { email, password } = user;
    const promise = this.auth.signInWithEmailAndPassword(email, password)
    return from(promise).pipe(
      catchError(error => {
        if (error.code == "auth/user-not-found") {
          this.toastr.error("Usuario não cadastrado.");

        } else if (error.code == "auth/wrong-password") {
          this.toastr.error("senha incorreta.");

        } else {
          this.toastr.error("Error ao autenticar.");
          console.error(error);
        }

        this.toastr.error("Erro ao autenticar");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public cadastarUsuarioComEmailSenha(user: User): Observable<any> {
    const { email, password } = user;
    const promessa = this.auth.createUserWithEmailAndPassword(email, password)
    return from(promessa).pipe(
      catchError(error => {
        this.toastr.error("Erro ao cadastrar o usuário.")
        console.error(error)
        return EMPTY
      })
    )
  }

  public criarBancoUsuario(usuario: Usuarios): Observable<any> {
    const promise = this.firestore.collection('usuarios').doc(usuario.id).set(usuario)
    return from(promise).pipe(
      catchError(erro => {
        this.toastr.error("Erro ao cadastrar.");
        console.error(erro);
        return EMPTY;
      })
    )
  }

  public sair() {
    const promessa = this.auth.signOut()
    return from(promessa)
  }
}
