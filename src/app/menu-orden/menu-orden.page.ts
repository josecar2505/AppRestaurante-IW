import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-orden',
  templateUrl: './menu-orden.page.html',
  styleUrls: ['./menu-orden.page.scss'],
})
export class MenuOrdenPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {
  }

  public gotomesas() {
    this.router.navigate(['/home']);
  }
    
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit() {
  }

}


 

