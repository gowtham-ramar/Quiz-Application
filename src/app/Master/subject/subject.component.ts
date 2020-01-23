import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

items: Array<any>;
item: any;
lang:string='en';
isViewMode:boolean=false;
data :any;
  constructor(
    private router: Router,
    public firebaseService: FirebaseService
  ) {     
  }

 ngOnInit() {
    this.resetData();    
  }
  resetData(){
   this.data= {
      "SubjectName":{"en":"","ta":""},
      "Image":"",
      "Description":{"en":"","ta":""},
      "CreatedBy":"",
      "CreatedOn":""
   }
   this.getData();
  }
getData(){  
    this.firebaseService.getSubjects()
    .subscribe(result => {
      this.items = result;
    });    
  }

  saveData(){
     this.data.CreatedBy='admin';
      this.data.CreatedOn=new Date();
    this.firebaseService.createSubject(this.data)
    .then(
      res => {
       this.resetData();
      }
    )
  }
   deleteData(id){
    this.firebaseService.deleteSubject(id)
    .then(
      res => {
        this.resetData();
      },
      err => {
        console.log(err);
      }
    )
  }
  viewData(id){
    this.isViewMode=true;
        this.firebaseService.getSubject(id)
    .subscribe(result => {
 
      let item = result.payload.data();
      if (item) {
         console.log(item.payload.data())
            console.log(this.data)
        this.data = item.payload.data();
    
        this.data.id = item.payload.id;
      
      }
    });    
  }

}





