import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from '../models/order.model';
import { AuthService } from '../services/auth.service';
import { ComServiceService } from '../services/order.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  
})
export class HistorialPage implements OnInit {
  userData: any;
  historial: Mesa[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  

  constructor(private comService: ComServiceService, private router: Router, private authService: AuthService,private datePipe: DatePipe,) {}

  ngOnInit() {
    // Initialize default start and end dates if needed
    this.startDate = new Date();
    this.endDate = new Date();
    this.loadHistorial();
    this.userData = this.authService.getUserData();

  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public gotomesas() {
    this.router.navigate(['/home']);
  }
  public gotomenu() {
    this.router.navigate(['/menu-orden']);
  }



totalSum: number = 0;

loadHistorial() {
  this.comService.getHistorialComandasByDateRange(this.startDate, this.endDate)
    .subscribe((historial: Mesa[]) => {
      this.historial = historial.map(mesa => ({
        ...mesa,
        fecha: mesa.fecha instanceof Date ? mesa.fecha : new Date(mesa.fecha),
      }));

      // Calcular la suma de totales
      this.totalSum = this.historial.reduce((sum, mesa) => sum + mesa.order.total, 0);
    });
}


  
  
  
}
