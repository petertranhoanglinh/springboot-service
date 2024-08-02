import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
const appLayoutModule = () => import ("../app/app-layout/app-layout.module").then(x => x.AppLayoutModule);
const routes: Routes = [
  { path: "", loadChildren: appLayoutModule },
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
