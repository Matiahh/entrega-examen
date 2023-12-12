import { Component,ElementRef,ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonCard } from '@ionic/angular';
import { IonAvatar,AnimationController,IonModal} from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AutentificarService } from '../servicios/autentificar.service';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private router: Router,private animationCtrl:AnimationController, private auth: AutentificarService) {


  }
  private animation!:Animation;

  public alertButtons: string = "OK";


  mensage = '';
 


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensage = `Hola, ${ev.detail.data}!`;
    }
  }


  public mensaje ="";
  public estado: String = "";
  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
    .addElement(this.avatar.nativeElement)
    .duration(1500) 
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.0');
  }

  user={
    usuario:"",
    password:""
  }
  avatarPlay(){
    this.animation.play();
  }
  loginInformacion(){
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.autenticado) {
    let navigationExtras: NavigationExtras = {
      state: { user: this.user }
    }
    this.router.navigate(['/registrado'], navigationExtras); 
  } else {
    this.mensaje = "Debe ingresar sus credenciales";
}
});   
  }

  recuperarInformacion() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.user }
    }
    this.router.navigate(['/recuperar'], navigationExtras);
  }

  mostarConsola(){
    console.log(this.user);
    if(this.user.usuario.length <8 && this.user.password.length <4){
      this.mensaje="Usuario conectado";
    } else{
      this.mensaje ="usuario y contraseña deben tener algun valor"
    }
  }
  confirm() {
    this.auth.register(this.user.usuario, this.user.password).then((res) => {
      if (res) {
        this.estado = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.modal.dismiss(this.user.usuario, 'confirm');
      }
    }) 
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
