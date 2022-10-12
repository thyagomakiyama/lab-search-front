/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, CollectionReference, DocumentData, where, QueryConstraint, WhereFilterOp } from 'firebase/firestore'
import Brand from '../types/Brand'
import Item from '../types/Item'
import { firebaseDB } from './firebase'

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firebaseDB, collectionName) as CollectionReference<T>
}

export const itemsCollection = createCollection<Item>('items')
export const brandsCollection = createCollection<Brand>('brands')

export const filter = (field: string, operator: WhereFilterOp, value: string | string[] | number | number[] | boolean): QueryConstraint => {
  if (value === '' || value.toString() === '') {
    return where('_none', '==', false)
  }

  return where(field, operator, value)
}
