import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dados } from 'src/app/interfaces/dados';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent {
  public isLoadUpload: boolean = false;
  public imagem: string = ""

  public dados: Dados = {
    id: '',
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tarefasService: TarefasService,
    private authService: AuthService,
    private auth: AngularFireAuth

  ) {
  }

  ngOnInit(): void { 
    this.buscarUsuarioComID()
  }

  public usuario: Usuarios = {
  id: "",
  nome: "",
  }

  public salvarDados(formulario: NgForm): void {
    if (formulario.valid) {
      this.usuario.id = this.dados.id
      this.usuario.foto = this.imagem
      this.authService.criarBancoUsuario(this.usuario).subscribe(resposta => {
        this.toastr.success("Cadastro finalizado com sucesso!");
        this.router.navigate(['/paginas/home'])
      });
    } else {
      this.toastr.error("É obrigatório o preenchimento do nome da obra e episódio para realizar o salvamento!");
    }
  }

  public salvarArquivo(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.tarefasService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL()
      promiseFileUrl.then((imagem: string) => {
        this.imagem = imagem;
      })
    });
  }

  public buscarUsuarioComID() {
    this.auth.user.subscribe((User) => {
      this.dados.id = User?.uid
      this.usuario.id = this.dados.id
  })
}
}
