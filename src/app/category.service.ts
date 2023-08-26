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
import { Category, News, Event } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesRef: AngularFireList<Category>;

  constructor(private fs: Firestore) {}

  getCategories(): any {
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


  getEvent(id?: string) {
    const collectionInstance = collection(this.fs, 'event');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  createEvent(event: Event) {
    const collectionInstance = collection(this.fs, 'event');
    return addDoc(collectionInstance, event);
  }

  updateEvent(id: string, formData: any) {
    const docInstance = doc(this.fs, 'event', id);
    const updatedData = { ...formData };

    return updateDoc(docInstance, updatedData);
  }

  deleteEvent(id: string) {
    const docInstance = doc(this.fs, 'category', id);
    return deleteDoc(docInstance);
  }

  getNews(id?: string) {
    const collectionInstance = collection(this.fs, 'news');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  createNews(news: News) {
    const collectionInstance = collection(this.fs, 'news');
    return addDoc(collectionInstance, news);
  }

  updateNews(id: string, formData: any) {
    const docInstance = doc(this.fs, 'news', id);
    const updatedData = { ...formData };

    return updateDoc(docInstance, updatedData);
  }

  deleteNews(id: string) {
    const docInstance = doc(this.fs, 'news', id);
    return deleteDoc(docInstance);
  }
}
