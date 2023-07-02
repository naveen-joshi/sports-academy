import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';

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
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesRef: AngularFireList<Category>;

  constructor(private fs: Firestore) {}

  getUsers(): any {
    const collectionInstance = collection(this.fs, 'category');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  create(category: Category): any {
    const collectionInstance = collection(this.fs, 'category');
    return addDoc(collectionInstance, category);
  }

  getUser(userId: string): any {
    const docInstance = doc(this.fs, 'category', userId);
  }

  update(id: string, formData: any): Promise<void> {
    const docInstance = doc(this.fs, 'category', id);
    const updatedData = { ...formData };

    return updateDoc(docInstance, updatedData);
  }

  delete(id: string): Promise<void> {
    const docInstance = doc(this.fs, 'category', id);
    return deleteDoc(docInstance);
  }
}
