import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {
  }

  ngOninit() {
    this.disableTab('orden');
    this.disableTab('comanda');
  }
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public ordenar(){
    this.router.navigate(['/menu-orden']);
  }

  disableTab(tabValue: string) {
    const segmentButton = document.querySelector(`ion-segment-button[value="${tabValue}"]`);
    if (segmentButton) {
      segmentButton.setAttribute('disabled', 'true');
    }
  }
}
