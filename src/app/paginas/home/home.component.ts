import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Dados } from 'src/app/interfaces/dados';
import { Tarefas } from 'src/app/interfaces/tarefas';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tarefas: Tarefas[] = []
  public checked: boolean = false

  constructor(
    private tarefasService: TarefasService,
    private toastr: ToastrService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.buscarUsuarioComID()

  }

  public id: string = ''
  public dados: Dados = {
    id: '',
  }

  public buscarUsuarioComID() {
    this.auth.user.subscribe((User) => {
      this.dados.id = User?.uid as string
      this.tarefasService.buscaUsuarioNoBanco(this.dados.id).subscribe(retorno => {
        if (retorno.id == this.dados.id) {
          this.initializeTable()
        }
      })
    })
  }

  private initializeTable(): void {
    this.tarefasService.buscarTodasTarefas(this.dados.id as string).subscribe(retorno => {
      this.tarefas = retorno;
    });
  }

  public apagarTarefa(id: string): void {
    this.tarefasService.apagarTarefa(id).subscribe(retorno => {
      this.toastr.success("Item da lista apagado com sucesso!");
      this.initializeTable();
    });
  }
}
