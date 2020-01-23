import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

items: Array<any>;
subjects: Array<any>;
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
    this.firebaseService.getSubjects()
    .subscribe(result => {
      this.subjects = result;
    });      
  }
  resetData(){
   this.data= {
      "ChapterName":{"en":"","ta":""},
	  "SubjectId":"",
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
    this.firebaseService.getChapters(this.data.SubjectId)
    .subscribe(result => {
      this.items = result;
    });    
  }

  saveData(){
    if(this.isCreateMode){
     this.data.CreatedBy='admin';
      this.data.CreatedOn=new Date();
      this.data.Status='live';
    this.firebaseService.createChapter(this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }else{
       this.data.UpdatedBy='admin';
      this.data.UpdatedOn=new Date();
       this.firebaseService.updateChapter(this.id,this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }
  }
   deleteData(id){
    this.firebaseService.statusUpdateChapter(id,'notlive')
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
        this.firebaseService.getChapter(id)
    .subscribe(result => {
      let item = result.payload.data();
      if (item) {         
        this.data =item;    
        this.id = result.payload.id;    
      
      }
    });    
  }

}





