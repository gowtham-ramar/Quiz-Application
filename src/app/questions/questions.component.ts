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

   
  }
  addOptions(idx){
    this.questions[idx].Options.push({
        "OptionsTitle":{"en":"","ta":""}
      });
  }

  addQuestions() {
this.isCreateMode=true;
  this.questions= {
      "QuestionTitle":{"en":"","ta":""},
      "Mark":1,
      "TimeToAnswerInSec":60,
      "Level":"",
      "SubjectId":this.SubjectId,
      "ChapterId":this.SubjectId,
      "ClassId":this.ClassId,
      "QuestionType":"",
      "Status":"live",    
      "IsCorrect":0,
      "Options":[{
        "OptionsTitle":{"en":"","ta":""}
      }],
      "CreatedBy":"",
      "CreatedOn":new Date() 
      
    }
    this.data.push(this.questions);
  }
  quizId:string="";
  quizComments:string="";
  addComments(id){
this.quizId=id;
this.quizComments="";
this.getComment(id);
  }
//   saveComments(){
//     if(this.quizComments=="")
//     return;
//     var data={
// "user":"admin",
// "comment":this.quizComments,
// "questionId":this.quizId,
//     };
//     this.firebaseService.createComment(data)
//     .then(
//       res => {
//       alert("comments added")
//       }
//     )
//   }

getData(){
  
    this.firebaseService.getQuestion('')
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


  save(){


    this.firebaseService.createQuestion(this.questions)
    .then(
      res => {
      
      }
    )
  }
  //  delete(id){
  //   this.firebaseService.deleteQuestion(id)
  //   .then(
  //     res => {
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

}