import { Injectable } from '@angular/core';
import { User } from './user.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';
import { docSnapshots } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/users';

  usersRef: AngularFireList<User>;

  constructor(private fs: Firestore) {}

  getUsers(): any {
    const collectionInstance = collection(this.fs, 'users');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  create(user: User): any {
    const collectionInstance = collection(this.fs, 'users');
    return addDoc(collectionInstance, user);
  }

  getUser(userId: string): any {
    const docInstance = doc(this.fs, 'users', userId);
  }

  update(id: string): Promise<void> {
    const docInstance = doc(this.fs, 'users', id);
    const updatedData = { name: 'Updated Name' };

    return updateDoc(docInstance, updatedData);
  }

  delete(id: string): Promise<void> {
    const docInstance = doc(this.fs, 'users', id);
    return deleteDoc(docInstance);
  }
}
