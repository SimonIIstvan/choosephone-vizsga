import { Routes } from '@angular/router';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { TelephonesComponent } from './telephones/telephones.component';
import { TelephoneDetailComponent } from './telephones/telephone-detail/telephone-detail.component';

export const routes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    
    {
        path: 'bejelentkezes', component: LoginPanelComponent
    },

   

    {
        path: 'regisztracio', component: RegisterPanelComponent
    },

    {
        path: 'telefonok', component: TelephonesComponent
    },

    {
        path: 'telefonok/:id', component: TelephoneDetailComponent
    }
];
