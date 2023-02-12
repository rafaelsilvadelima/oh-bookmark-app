import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dados } from 'src/app/interfaces/dados';
import { Tarefas } from 'src/app/interfaces/tarefas';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public isLoadUpload: boolean = false;
  private imagem: string = ""
  public dados: Dados = {
    id: '',
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tarefasService: TarefasService,
    private auth: AngularFireAuth
  ) {
  }

  public tarefa: Tarefas = {
      id: '',
      idUsuario: "",
      nome: "",
      episodio: "",
      temporada: "",
      lancamento:"",
      site: ""
  }

  public variavel!: ""

  public salvarTarefa(formulario: NgForm): void {
    this.tarefa.idUsuario = this.dados.id as string
    if(formulario.valid) {
      this.tarefa.imagem = this.imagem
      this.tarefasService.criarTarefa(this.tarefa).subscribe(retorno => {
        this.variavel = retorno.id
        this.toastr.success("Tarefa cadastrada com sucesso!");
        this.registrarIdTarefa()
        this.router.navigate(["/paginas/home"])

      });
    } else {
      this.toastr.error("É obrigatório o preenchimento do nome da obra e episódio para realizar o salvamento!");
    }
  }

  public registrarIdTarefa() {
    this.tarefa.id = this.variavel as string
    this.tarefasService.atualizarTarefa(this.tarefa).subscribe(retorno => {

    })
  }


  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.tarefasService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((imagem: string) => {
        this.imagem = imagem;
      })
    });
  }

  ngOnInit(): void { 
    this.buscarUID()
  }

    public buscarUID() {
    this.auth.user.subscribe((User) => {
    this.dados.id = User?.uid as string
    })
    }
}
