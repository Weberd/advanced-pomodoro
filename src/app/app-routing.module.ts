import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CountdownComponent} from "./countdown/countdown.component";

const routes: Routes = [
  { path: '', component: CountdownComponent},
  { path: '**', redirectTo: 'file-manager' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
