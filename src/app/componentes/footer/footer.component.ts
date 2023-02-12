import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor (
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ){  }

  public sair(): void {
    this.authService.sair().subscribe(retorno => {
      this.toastr.success("Até logo!");
      this.router.navigate(["/paginas/login"])
    })
  }

  public aviso(){
    this.toastr.error("Aguarde! Essa página está sendo desenvolvida.")
  }
}
