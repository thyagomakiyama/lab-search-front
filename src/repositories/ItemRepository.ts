import { stringCapitalize, capitalize, centsToReal } from './../utils/utils'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { query, getDocs } from 'firebase/firestore'
import { brandsCollection, filter, itemsCollection } from '../services/firestore'
import Brand from '../types/Brand'
import Item from '../types/Item'

const searchField = {
  brand: 'brand',
  name: 'nameArray'
}

export const itemRepository = () => ({
  getItems: async (brand: string, name: string): Promise<Item[]> => {
    const brandFilter = filter(searchField.brand, '==', brand.toLowerCase())
    const nameFilter = filter(searchField.name, 'array-contains-any', name.toLowerCase().split(' '))

    const stmt = query(
      itemsCollection,
      brandFilter,
      nameFilter
    )

    const items: Item[] = []
    const data = await getDocs(stmt)
    data.forEach((doc) => items.push({
      id: doc.id,
      name: stringCapitalize(doc.data().name),
      description: capitalize(doc.data().description),
      price: centsToReal(doc.data().price),
      brand: stringCapitalize(doc.data().brand),
      model: doc.data().model.toUpperCase(),
      store: stringCapitalize(doc.data().store)
    }))
    return items
  },
  getBrands: async (): Promise<Brand[]> => {
    const stmt = query(brandsCollection)
    const data = await getDocs(stmt)

    const brands: Brand[] = []
    data.forEach((doc) => brands.push({
      name: doc.data().name
    }))
    return brands
  }
})
