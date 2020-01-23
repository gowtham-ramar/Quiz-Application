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
isSubmit=true;
questions :any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { 
    
  }

 ngOnInit() {
    this.createForm();
    this.getData();
  }
  addOptions(){
    this.questions.Options.push({
        "OptionsTitle":{"en":"","ta":""}
      });
  }

  createForm() {
  this.questions= {
      "QuestionTitle":{"en":"","ta":""},
      "Mark":1.5,
      "TimeToAnswerInSec":60,
      "Level":"easy",
      "Subject":"tamil",
      "QuestionType":"single",
      "Chapter":"thirukural",
      "IsCorrect":0,
      "Options":[{
        "OptionsTitle":{"en":"","ta":""}
      }]
    }
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
    };
    this.firebaseService.createComment(data)
    .then(
      res => {
      alert("comments added")
      }
    )
  }

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
  resetFields(){
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  save(){


    this.firebaseService.createQuestion(this.questions)
    .then(
      res => {
       this.createForm();
      }
    )
  }
   delete(id){
    this.firebaseService.deleteQuestion(id)
    .then(
      res => {
        this.createForm();
      },
      err => {
        console.log(err);
      }
    )
  }

}