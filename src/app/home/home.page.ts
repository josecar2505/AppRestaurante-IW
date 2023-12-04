import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ComServiceService } from '../services/order.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController, private comServiceService: ComServiceService) {
  }

  ngOnInit() {
    this.disableTab('orden');
    this.disableTab('comanda');
  }
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public ordenar(numeroMesa: number) {
    // Guarda el número de mesa en el servicio o donde sea necesario
    this.comServiceService.setNumeroMesa(numeroMesa);
    console.log("Has elegido la mesa" + this.comServiceService.getNumeroMesa());
    // Navega a la página de menu-orden
    if(this.comServiceService.getStatus(numeroMesa) == true){
      this.router.navigate(['/menu-orden']);
    }else{
      this.router.navigate(['/comanda']);
    }
  }

  isGerente(): boolean {
    // Asumiendo que tienes un método en tu servicio de autenticación para obtener el rol del usuario
    //console.log(this.authService.getUserData().type);
    return this.authService.getUserData().type == "administrador";
  }
  

  public getStatus(mesa: number) {
    if(this.comServiceService.getStatus(mesa) == true){
      return "Disponible";
    }else{
      return "Ocupado";
    }
    
  }
  


  disableTab(tabValue: string) {
    const segmentButton = document.querySelector(`ion-segment-button[value="${tabValue}"]`);
    if (segmentButton) {
      segmentButton.setAttribute('disabled', 'true');
    }
  }
}
