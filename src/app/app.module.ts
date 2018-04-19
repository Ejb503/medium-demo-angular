import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import * as Rx from 'rxjs';

// Material  inputs
import { MatInputModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatRadioModule, MatPaginatorModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { DataService } from './data.service';
import { WebSocketService } from './websocket.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './blocks/header/header.component';
import { FooterComponent } from './blocks/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule, 
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [DataService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

