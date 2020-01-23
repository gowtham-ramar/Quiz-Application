import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

items: Array<any>;
item: any;
lang:string='en';
isViewMode:boolean=false;
isUpdateMode:boolean=false;
isCreateMode:boolean=false;
id:string="";
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
      "ClassName":{"en":"","ta":""},
      "Image":"",
      "displayOrder":0,
      "Description":{"en":"","ta":""},
      "CreatedBy":"",
      "CreatedOn":""
   }
    this.isCreateMode=true;
    this.isUpdateMode=false;
    this.isViewMode=false;
   this.getData();
  }
getData(){  
    this.firebaseService.getClasss()
    .subscribe(result => {
      this.items = result;
    });    
  }

  saveData(){
    if(this.isCreateMode){
     this.data.CreatedBy='admin';
      this.data.CreatedOn=new Date();
      this.data.Status='live';
    this.firebaseService.createClass(this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }else{
       this.data.UpdatedBy='admin';
      this.data.UpdatedOn=new Date();
       this.firebaseService.updateClass(this.id,this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }
  }
   deleteData(id){
    this.firebaseService.statusUpdateClass(id,'notlive')
    .then(
      res => {
        this.resetData();
      },
      err => {
        console.log(err);
      }
    )
  }
  viewData(id,modeView){

    if(modeView){
    this.isViewMode=true;
    this.isUpdateMode=false;
    this.isCreateMode=false;
    }else 
    {
       this.isViewMode=false;
       this.isUpdateMode=true;
       this.isCreateMode=false;
    }
        this.firebaseService.getClass(id)
    .subscribe(result => {
      let item = result.payload.data();
      if (item) {         
        this.data =item;    
        this.id = result.payload.id;    
      
      }
    });    
  }

}





