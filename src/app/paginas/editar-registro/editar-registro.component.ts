import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dados } from 'src/app/interfaces/dados';
import { Tarefas } from 'src/app/interfaces/tarefas';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent {
  public dados: Dados = {
    id: ""
  }

  public isLoadUpload: boolean = false;

  public tarefa: Tarefas = {
    id: '',
    idUsuario: '',
    nome: '',
    episodio: '',
    temporada: '',
    lancamento: '',
    site: ''
  }

  constructor(
    private tarefasService: TarefasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.InicializeCampos();
  }

  private InicializeCampos(): void {
    this.auth.user.subscribe((User) => {
      this.dados.id = User?.uid as string
    const id = this.route.snapshot.params["id"];
    this.tarefasService.buscarTarefasPorId(id).subscribe((retorno) => {
      this.tarefa = retorno;
    })
  })
  }

  public atualizarTarefa(form: NgForm): void {
    if (form.valid) {
      this.tarefa.idUsuario = this.dados.id as string,
      this.tarefasService.atualizarTarefa(this.tarefa).subscribe(retorno => {
        this.toastr.success("Atualizado com sucesso.");
        this.router.navigate(["/paginas/home"]);
      });
    }
    else {
      this.toastr.error("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.tarefasService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.tarefa.imagem = fotoUrl;
      })
    });
  }
}
