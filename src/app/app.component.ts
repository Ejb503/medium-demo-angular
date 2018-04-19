import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'; // <-- do not forget to import
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataService } from './data.service';
import { WebSocketService } from './websocket.service';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, WebSocketService],
  animations: [ trigger('onOffTrigger', [
    state('off', style({
      backgroundColor: '#E5E7E9',
      transform: 'scale(1)'
    })),
    state('on',   style({
      backgroundColor: 'green',
      transform: 'scale(1.1)'
    })),
    transition('off => on', animate('.6s 100ms ease-in')),
    transition('on => off', animate('.7s 100ms ease-out'))
    ])]
  })


export class AppComponent {
  title = 'app';
  addProduct: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Data for table
  displayedColumns = ['title','body','date'];
  dataSource = new MatTableDataSource();

  array1: any = [];
  array2: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    public dataService : DataService,
    private wsService: WebSocketService
  ) {
    this.wsService.createObservableSocket('wss://medium-demo-angular.blockbinder.com/api/')
    .subscribe(message =>  {
        this.dataService.tableData().subscribe(updatedData => {
          console.log(updatedData);
          this.array2 = updatedData;
          var length = this.array1.length;
          var length2 = this.array2.length;
          var lengthdifference = length2 - length;
          this.array2.sort(this.compare);

          for(let key in this.array2){
            this.array2[key].active = 'off';
          }
          this.dataSource = new MatTableDataSource(this.array2);
          if(lengthdifference > 0){
            this.array2[0].active = 'on';
          }
          setTimeout(()=>{    //<<<---    using ()=> syntax
            this.array2[0].active = 'off';
          },3000);
        })
    },
    err => console.log(err),
    () => console.log('stream complete')
    );
}

  ngAfterViewInit() {
   this.dataService.tableData().subscribe(response => {
      console.log(response);
      this.array1 = response;
      this.array1.sort(this.compare);
      for(let key in this.array1){
        this.array1[key].active = 'off';
      }
      this.dataSource = new MatTableDataSource(this.array1);
    })
  }

  compare(a,b) {
    if (a.blocktime > b.blocktime)
      return -1;
    if (a.blocktime < b.blocktime)
      return 1;
    return 0;
  }

}


