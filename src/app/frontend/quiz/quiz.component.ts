import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  interval } from 'rxjs';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
item:any;
questions:any=[];
lang:string='en';
id:string="";
  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
     this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.getQuestions(this.item.QuestionId);
        this.id = data.payload.id;
  
      }
    })
  }
  startQuizIdx:number=0;
  userNavigation:any=[];
  totalTime:number=0;
getQuestions(ids){
  
   this.firebaseService.getQuestionsById(ids)
    .subscribe(result => {
      this.questions = result;
    this.startQuizIdx=0;
    this.userNavigation=[];
   
    this.questions.forEach((item, index)=>{
     
      this.userNavigation.push({idx:index,color:'',time:0});
    });
    //    interval(1000).subscribe((res) =>{
    //    this.userNavigation[this.startQuizIdx].time += 1;
    //    this.totalTime+=1;
    // });
    })    
}
optionSelect(idx){
  this.navigation(idx,'btn-info');
}
navigation(idx,color){
  this.startQuizIdx=idx;
  if(this.userNavigation[idx].color=='' && color=='btn-warning'){
      this.userNavigation[idx].color=color;      
  }else {
      this.userNavigation[idx].color=color;      
  }
}
previewQuestion(){
this.startQuizIdx-=1;
}
nextQuestion(){
this.startQuizIdx+=1;
}
}