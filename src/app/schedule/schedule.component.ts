import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';
interface Todo {
  content: string;
  id?: string;
  datemodified?: Date;
  isDone?: boolean;
}
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  todoCollection: AngularFirestoreCollection<Todo>;
   todoList: Observable<Todo[]>;
   todoDoc: AngularFirestoreDocument<Todo>;
   inputId: string;
   inputValue: Todo = {
     content: "",
   }

   editValue: boolean = false;
   constructor(public afs: AngularFirestore, public snackBar: MatSnackBar) {
   }
   ngOnInit() {

     this.todoCollection = this.afs.collection('Todolist');
     this.todoList = this.afs.collection('Todolist', ref => ref.orderBy('datemodified')).snapshotChanges().map(changes => {
       return changes.map(a => {
         const data = a.payload.doc.data() as Todo;
         data.id = a.payload.doc.id;
         return data;
       })
     })
   }

   addNewItem() {
     if (this.inputValue.content != "") {
       this.inputValue.datemodified = new Date();
       this.inputValue.isDone = false;
       this.todoCollection.add(this.inputValue);
       this.inputValue.content = "";
       this.openSnackBar("Added Successfuly!", "Dismiss");
     }
   }

   deleteItem(i) {
     this.todoDoc = this.afs.doc(`Todolist/${i}`);
     this.todoDoc.delete();
     this.openSnackBar("Item Deleted!", "Dismiss");
   }
   editItem(i) {
     this.inputValue.content = i.content;
     this.editValue = true;
     this.inputId = i.id;
   }
   markItemAsDone(item) {
     this.inputValue.content = item.content;
     this.inputValue.isDone = true;
     this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
     this.todoDoc.update(this.inputValue);
     this.inputValue.content = "";
     this.openSnackBar("Item Done!", "Dismiss");
   }
   markItemAsNotDone(item) {
     this.inputValue.content = item.content;
     this.inputValue.isDone = false;
     this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
     this.todoDoc.update(this.inputValue);
     this.inputValue.content = "";
     this.openSnackBar("Item Not Done!", "Dismiss");
   }
   saveNewItem() {
     if (this.inputValue.content != "") {
       this.inputValue.isDone = false;
       this.inputValue.datemodified = new Date();
       this.todoDoc = this.afs.doc(`Todolist/${this.inputId}`);
       this.todoDoc.update(this.inputValue);
       this.editValue = false;
       this.inputValue.content = "";
       this.openSnackBar("Updated Successfuly!", "Dismiss");
     }
   }
   openSnackBar(message: string, action: string) {
     this.snackBar.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
     });
   }
   toggleCheck(i) {

   }

}
