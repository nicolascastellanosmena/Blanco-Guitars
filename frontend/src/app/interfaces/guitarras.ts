export type Guitarras = Guitarra[]

export interface Guitarra {
  _id: string
  name: string
  brand: string
  type: string
  price: number
  rating: number
  description: string
  image: string[]
}
