import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule),
    canActivate: [AuthGuard]
  },
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
