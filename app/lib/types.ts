export type CabinPhoto = {
    alt: string | null
    url: string | null
  }
  
  export type Cabin = {
    _id: string
    name: string | null
    slug: string | null
    description: string | null
    pricePerNight: number | null
    maxGuests: number | null
    amenities: string[] | null
    photos: CabinPhoto[] | null
  }