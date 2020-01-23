import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-new',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
exampleForm: FormGroup;
items: Array<any>;
comments: Array<any>;
userAnswer:any[];
lang:string='en';
data: Array<any>;
isSubmit=true;
id:string="";
subjects:any;
classes:any;
chapters:any;
ClassId:string="";ChapterId:string="";SubjectId:string="";
isViewMode:boolean=false;
isUpdateMode:boolean=false;
isCreateMode:boolean=false;
questions :any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { 
    
  }

 ngOnInit() {

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
this.firebaseService.getChapters(this.SubjectId)
    .subscribe(result => {
      this.chapters = result;
    });    
  }
  addOptions(idx){
    alert(this.data[idx])
    this.data[idx].Options.push({
        "OptionsTitle":{"en":"","ta":""}
      });
  }

  addQuestions() {
this.isCreateMode=true;
  this.questions= {
     "SubjectId":this.SubjectId,
      "ChapterId":this.SubjectId,
      "ClassId":this.ClassId,
      "QuestionTitle":{"en":"","ta":""},
      "Mark":1,
      "TimeToAnswerInSec":60,
      "QuestionType":"single",
      "Level":"easy",
      
      "IsCorrect":0,
      "DisplayOrder":0,
      "Options":[{
        "OptionsTitle":{"en":"","ta":""}
      }],  
      "Explantion":{"en":"","ta":""},        
      "Status":"live",    
      "CreatedBy":"admin",
      "CreatedOn":new Date() 
      
    }
    if(typeof(this.data)=="undefined")
      this.data=[];
    this.data.push(this.questions);
  }
  quizId:string="";
  quizComments:string="";
  addComments(id){
this.quizId=id;
this.quizComments="";
this.getComment(id);
  }
  saveComments(){
    if(this.quizComments=="")
    return;
    var data={
"user":"admin",
"comment":this.quizComments,
"questionId":this.quizId,
"createdOn":new Date()
    };
    this.firebaseService.createComment(data)
    .then(
      res => {
      alert("comments added")
      }
    )
  }

getData(){
  
    this.firebaseService.getQuestions('')
    .subscribe(result => {
      this.items = result;
      this.userAnswer=[];
    })    
  }
  getComment(id){
  
    this.firebaseService.getComment(id)
    .subscribe(result => {
      this.comments = result;
    
    })    
  }

getQuestion(id,modeView){
  debugger;
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
     this.firebaseService.getQuestion(id)
    .subscribe(result => {
      let item = result.payload.data();
      if (item) {    
        if(typeof(this.data)=="undefined"){
          this.data=[];
        }     
        this.data.push(item);    
        this.id = result.payload.id;    
      
      }
    });   
}
  saveQuestions(idx){

if(this.data.length>0 && this.data.length>idx)
{
   if(this.isCreateMode){
    this.firebaseService.createQuestion(this.data[idx])
    .then(
      res => {
      idx=idx+1;
      this.saveQuestions(idx);
      }
    )
   }else{
      this.data[idx].UpdatedBy='admin';
      this.data[idx].UpdatedOn=new Date();
       this.firebaseService.updateChapter(this.id,this.data[idx])
    .then(
      res => {
       
      }
    )
   }
}
this.getData();
this.data=[];
this.isCreateMode=false;
this.isUpdateMode=false;
  }
   delete(id){
    this.firebaseService.deleteQuestion(id)
    .then(
      res => {
      },
      err => {
        console.log(err);
      }
    )
  }

}