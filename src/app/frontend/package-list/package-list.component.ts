import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {


items: Array<any>;

subjects: Array<any>;
lang:string='en';

SubjectId:string="";
  constructor(
    private router: Router,
    public firebaseService: FirebaseService
  ) {     
  }

 ngOnInit() {
    this.firebaseService.getSubjects()
    .subscribe(result => {
      this.subjects = result;
    });     
   
  }
 
getData(){  
    this.firebaseService.getPackages(this.SubjectId)
    .subscribe(result => {
      this.items = result;
    });    
  }
  viewData(id){
    
 this.router.navigate(['/quiz/'+id]);
  }


}





