import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasOneComponent } from './pages/canvas-one/canvas-one.component';

const routes: Routes = [
  {
    path:'canvas-one',
    component:CanvasOneComponent
  },
  {
    path:'',
    redirectTo:'canvas-one',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
