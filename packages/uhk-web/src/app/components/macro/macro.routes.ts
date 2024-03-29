import { Routes } from '@angular/router';

import { MacroEditComponent } from './edit/macro-edit.component';
import { MacroNotFoundComponent, MacroNotFoundGuard } from './not-found';

export const macroRoutes: Routes = [
    {
        path: 'macro',
        component: MacroNotFoundComponent,
        canActivate: [MacroNotFoundGuard]
    },
    {
        path: 'macro/:macroId',
        component: MacroEditComponent
    }
];
