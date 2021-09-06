import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";
import {AlertasService} from "../../service/alertas.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User =  new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0
    )
    if(environment.token == ''){
      //alert('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas')
    }
    else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente!')
        environment.token = ''
        environment.nome = ''
        environment.token = ''
        environment.id  = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

}