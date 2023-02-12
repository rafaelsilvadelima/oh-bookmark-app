import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formulario!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  public entrarComGoogle(): void {
    this.authService.autenticarGoogle().subscribe(credencial => {
      this.toastr.success('Bem vindo(a)!');
      this.router.navigate(["/paginas/home"])
    })
  }

  // public entrarComEmailSenha(): void {
  //   if (this.formulario.valid) {
  //     const user: User = this.formulario.value;
  //     this.authService.autenticarComEmailSenha(user).subscribe(credencial => {
  //       this.toastr.success("Bem Vindo(a) ao To Do List Hobbies!");
  //       this.router.navigate(["/home"])

  //     }
  //     );
  //   } else {
  //     this.toastr.error("Preencha o formulário de login!");
  //   }
  // }

  public aviso() {
    this.toastr.error('Login por email desabilitado para realização de mais testas.')
    this.toastr.success('Em Breve!')
  }
}
