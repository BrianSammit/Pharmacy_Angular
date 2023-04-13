import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent} from './pages/home-page/home-page.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomePageComponent,
 // ...canActivate(() => redirectUnauthorizedTo(['/register']))
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
