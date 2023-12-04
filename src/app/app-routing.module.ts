import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu-orden',
    loadChildren: () => import('./menu-orden/menu-orden.module').then( m => m.MenuOrdenPageModule)
  },
  {
    path: 'comanda',
    loadChildren: () => import('./comanda/comanda.module').then( m => m.ComandaPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'update-product',
    loadChildren: () => import('./update-product/update-product.module').then( m => m.UpdateProductPageModule)
  },
  {
    path: '**', // Cualquier otra ruta no especificada redirigirá al usuario a la página de inicio de sesión
    redirectTo: 'login' // Redirigir a la página de inicio de sesión en lugar de dejar en blanco
  },
  {
    path: 'order-details-modal',
    loadChildren: () => import('./order-details-modal/order-details-modal.module').then( m => m.OrderDetailsModalPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
