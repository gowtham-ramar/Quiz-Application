import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

items: Array<any>;
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
    this.firebaseService.getQuestion('')
    .subscribe(result => {
      this.items = result;
    })    
  }

  saveData(){
    this.firebaseService.createQuestion(this.data)
    .then(
      res => {
       this.resetData();
      }
    )
  }
   deleteData(id){
    this.firebaseService.deleteQuestion(id)
    .then(
      res => {
        this.resetData();
      },
      err => {
        console.log(err);
      }
    )
  }

}





