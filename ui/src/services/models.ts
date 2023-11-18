type Category = {
  id: number
  name: string
}

type Suburb = {
  id: number
  name: string
  postcode: string
}

export type Job = {
  id: number
  status: string
  suburb_id: number
  category_id: number
  contact_name: string
  contact_phone: string
  contact_email: string
  price: number
  description: string
  created_at: string
  updated_at: string
  categories: Category
  suburbs: Suburb
}
