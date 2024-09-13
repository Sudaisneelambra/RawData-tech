import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasOneComponent } from './pages/canvas-one/canvas-one.component';
import { CanvasTwoComponent } from './pages/canvas-two/canvas-two.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasOneComponent,
    CanvasTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
