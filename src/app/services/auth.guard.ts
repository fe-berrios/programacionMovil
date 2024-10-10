import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';

export const authGuard: CanActivateFn = (route, state) => {
  // Es para hacer un 'import' NavController
  // igual podria hacerlo para un localStorage, Router... etc.
  const navController = inject(NavController);
  const isAuthenticated = localStorage.getItem("usuario") ? true : false;

  // Validación si usuario NO esta logeado
  // y accede a una página distinta de '/home'
  // Si NO estas logeado (!isAuthenticated) y tu ruta NO es login (state.url != '/login')
  if(!isAuthenticated && state.url !== '/login'){
    // Devuelve a login
    navController.navigateRoot('/login');
    return false
  }
  return true;
};
