import { Routes } from '@angular/router';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { TelephonesComponent } from './telephones/telephones.component';
import { TelephoneDetailComponent } from './telephones/telephone-detail/telephone-detail.component';
import { AuthGuard } from './services/guard/auth.guard';
import { ComparePhonesComponent } from './compare-phones/compare-phones.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent)
    },

    {
        path: 'telefonok', component: TelephonesComponent, canActivate: [AuthGuard]
    },
    
    {
        path: 'bejelentkezes', component: LoginPanelComponent
    },


    {
        path: 'regisztracio', component: RegisterPanelComponent
    },

    {
        path: 'telefonok/:id', component: TelephoneDetailComponent
    },

    {
        path: 'compare/:telephoneId1/:telephoneId2', component: ComparePhonesComponent
    }
];
