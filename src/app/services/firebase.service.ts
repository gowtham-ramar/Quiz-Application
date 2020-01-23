import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
  createQuestion(value){
    return this.db.collection('questions').add(value);
  }
   getQuestion(value){
    return this.db.collection('questions').snapshotChanges();
  }
   updateQuestion(Key, value){
    return this.db.collection('questions').doc(Key).set(value);
  }

  deleteQuestion(Key){
    return this.db.collection('questions').doc(Key).delete();
  }

  createComment(value){
    return this.db.collection('comments').add(value);
  }
   getComment(value){
    return this.db.collection('comments',ref=>ref.where('questionId','==',value)).snapshotChanges();
  }
   updateComment(Key, value){
    return this.db.collection('comments').doc(Key).set(value);
  }

  deleteComment(Key){
    return this.db.collection('comments').doc(Key).delete();
  }

createSubject(value){
    return this.db.collection('subjects').add(value);
  }
   getSubjects(){
    return this.db.collection('subjects').snapshotChanges();
  }
     getSubject(key){
    return this.db.collection('subjects').doc(key).snapshotChanges();
  }
   updateSubject(Key, value){
    return this.db.collection('subjects').doc(Key).set(value);
  }

  deleteSubject(Key){
    return this.db.collection('subjects').doc(Key).delete();
  }
}