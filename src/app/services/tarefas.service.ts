import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { Tarefas } from '../interfaces/tarefas';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  public tarefa!: Tarefas

  public criarTarefa(tarefa: Tarefas): Observable <any> {
  const promessa = this.firestore.collection("tarefas").add(tarefa);
  return from(promessa).pipe(
    catchError(erro => {
      this.toastr.error("Erro ao cadastrar tarefa.");
      console.error(erro);
      return EMPTY;
    })
  )
}

public uploadFoto(photo: File): Observable<any> {
  const promise = this.storage.upload(`fotos/${Date.now()}`, photo);
  return from(promise).pipe(
    catchError(error => {
      this.toastr.error("Erro no envio da imagem.");
      console.error(error);
      return EMPTY;
    })
  );
}

public buscarTodasTarefas(uidUser: string): Observable<any> {
  const promise = this.firestore.collection("tarefas",ref => ref.where('idUsuario', '==', uidUser)).get();
  return from(promise).pipe(
    map((response: any) => {
      return response.docs.map((doc: any) => {
        const tarefas: Tarefas = doc.data() as Tarefas;
        tarefas.idUsuario = doc.id;
        return tarefas;
      })
    }),
    catchError(error => {
      this.toastr.error("Erro ao buscar dados das tarefas.");
      console.error(error);
      return EMPTY;
    })
  );
}

public buscarTarefasPorId(id: string):Observable<any> {
  const promise = this.firestore.collection("tarefas").doc(id).get();
  return from(promise).pipe(
    map(doc => {
      const tarefa: Tarefas = doc.data() as Tarefas;
      tarefa.idUsuario = doc.id
      return tarefa;
    }),
    catchError(error => {
      this.toastr.error("Erro ao buscar tarefa por id");
      console.error(error);
      return EMPTY;
    })
  )
}

public apagarTarefa(id: string) {
  const promise =  this.firestore.collection("tarefas").doc(id).delete();
  return from(promise).pipe(
    catchError(error => {
      this.toastr.error("Erro ao excluir.");
      console.error(error);
      return EMPTY;
    })
  );
}

public atualizarTarefa(tarefa: Tarefas) {
  const promise = this.firestore.collection("tarefas").doc(tarefa.id).update(tarefa);
  return from(promise).pipe(
    catchError(error => {
      this.toastr.error("Erro ao atualizar tarefa!");
      console.error(error);
      return EMPTY;
    })
  );
}

public buscaUsuarioNoBanco(id: string):Observable<any> {
  const promise = this.firestore.collection("usuarios").doc(id).get();
  return from(promise).pipe(
    map(doc => {
      const usuario: Usuarios = doc.data() as Usuarios;
      usuario.id = doc.id
      return usuario;
    }),
    catchError(error => {
      this.router.navigate(["/paginas/politicas"])
      console.error(error);
      return EMPTY
    })
  )
}

}
