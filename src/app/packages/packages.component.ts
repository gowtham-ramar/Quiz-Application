import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackageComponent implements OnInit {

items: Array<any>;
questions: Array<any>;
subjects: Array<any>;
classes: Array<any>;
chapters: Array<any>;
selectedQuestion: Array<any>;
confirmQuestion:any= [];
item: any;
lang:string='en';
isViewMode:boolean=false;
isUpdateMode:boolean=false;
isCreateMode:boolean=false;
ChapterId:string="";
ClassId:string="";
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
      this.firebaseService.getClasss()
    .subscribe(result => {
      this.classes = result;
    });       
  }
    getChapter(){
this.firebaseService.getChapters(this.data.SubjectId)
    .subscribe(result => {
      this.chapters = result;
    });    
  }
  resetData(){
   this.data= {
      "PackageName":{"en":"","ta":""},
	    "SubjectId":"",
      "Image":"",
      "displayOrder":0,
      "isFree":true,
      "Amount":0,
      "NumberOfQuestion":0,
      "TotalMark":0,
      "EachQuestion":0,
      "NegativeMarkEachQuestion":0,
      "Offer":"",
      "QuestionId":[],
      "Description":{"en":"","ta":""},
      "CreatedBy":"",
      "CreatedOn":""
   }
    this.isCreateMode=true;
    this.isUpdateMode=false;
    this.isViewMode=false;
  
  }
getData(){  
    this.firebaseService.getPackages(this.data.SubjectId)
    .subscribe(result => {
      this.items = result;
    });    
  }

getQuestion(){
  
    this.firebaseService.getQuestions('')
    .subscribe(result => {
      this.questions = result;
     
    })    
  }
  saveData(){
    if(this.isCreateMode){
     this.data.CreatedBy='admin';
      this.data.CreatedOn=new Date();
      this.data.Status='live';
    this.firebaseService.createPackage(this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }else{
       this.data.UpdatedBy='admin';
      this.data.UpdatedOn=new Date();
       this.firebaseService.updatePackage(this.id,this.data)
    .then(
      res => {
       this.resetData();
      }
    )
    }
  }
   deleteData(id){
    this.firebaseService.statusUpdatePackage(id,'notlive')
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
        this.firebaseService.getPackage(id)
    .subscribe(result => {
      let item = result.payload.data();
      if (item) {         
        this.data =item;    
        this.id = result.payload.id;    
      
      }
    });    
  }
questionSelection(id,title){
  if(typeof(this.selectedQuestion)=="undefined"){
this.selectedQuestion=[];    
  }
  if(typeof(this.confirmQuestion)=="undefined"){
this.confirmQuestion=[];    
  }
this.selectedQuestion.push({id:id,title:title});
this.confirmQuestion.push(id);
}
savQuestion(){
  this.data.QuestionId=this.confirmQuestion;
}
}





