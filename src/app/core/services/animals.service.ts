import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor (
    private fireStore: AngularFirestore,
  ) { }

  getAnimals() {
      return this.fireStore.collection("animals").valueChanges({ idField: 'id' })
  }

  addAnimals(animal) {
    return this.fireStore.collection("animals").add({
        ...animal,
     })
  }

  updateAnimals(animal) {
    return this.fireStore.collection("animals").doc(animal.id).update({
        ...animal,
     })
  }

  deleteAnimals(animal) {
    this.fireStore.collection("animals").doc(animal.id).delete();
  }

}
