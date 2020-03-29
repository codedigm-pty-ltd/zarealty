import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    //vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,

    //material
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [MainLayoutComponent]
})
export class CoreModule { }
