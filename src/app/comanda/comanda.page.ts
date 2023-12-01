import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

  comanda: Product[] = [];

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController, private activatedRoute: ActivatedRoute) {
  }
    
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public gotomesas() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const comandaParam = params.get('comanda');
      this.comanda = JSON.parse(comandaParam ?? '[]');
    });
  }

}
