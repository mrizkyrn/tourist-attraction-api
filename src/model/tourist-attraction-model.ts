import { TouristAttraction } from '@prisma/client';

export type TouristAttractionResponse = {
   id: number;
   user_id: number;
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   rating: number;
   status?: string;
   city: string;
   province: string;
};

export type TouristAttractionDetailResponse = {
   id: number;
   user_id: number;
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   rating: number;
   status: string;
   entrance_fee: number;
   address: string;
   city: string;
   province: string;
   country: string;
   postal_code: string;
   latitude?: number | null;
   longitude?: number | null;
   created_at: Date;
   updated_at: Date;
};

export type TouristAttractionsQueryParams = {
   name?: string;
   category?: string;
   city?: string;
   province?: string;
   tags?: string[];
   sort?: string;
   order?: 'asc' | 'desc';
   page: number;
   limit: number;
};

export type CreateTouristAttractionRequest = {
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   entrance_fee: number;
   address: string;
   city: string;
   province: string;
   country: string;
   postal_code: string;
   latitude?: number;
   longitude?: number;
};

export function toTouristAttractionResponse(touristAttraction: TouristAttraction): TouristAttractionResponse {
   return {
      id: touristAttraction.id,
      user_id: touristAttraction.user_id,
      thumbnail: touristAttraction.thumbnail,
      name: touristAttraction.name,
      description: touristAttraction.description,
      category: touristAttraction.category,
      tags: touristAttraction.tags,
      rating: touristAttraction.rating,
      status: touristAttraction.status,
      city: touristAttraction.city,
      province: touristAttraction.province,
   };
}

export function toTouristAttractionDetailResponse(touristAttraction: TouristAttraction): TouristAttractionDetailResponse {
   return {
      id: touristAttraction.id,
      user_id: touristAttraction.user_id,
      thumbnail: touristAttraction.thumbnail,
      name: touristAttraction.name,
      description: touristAttraction.description,
      category: touristAttraction.category,
      tags: touristAttraction.tags,
      rating: touristAttraction.rating,
      status: touristAttraction.status,
      entrance_fee: touristAttraction.entrance_fee,
      address: touristAttraction.address,
      city: touristAttraction.city,
      province: touristAttraction.province,
      country: touristAttraction.country,
      postal_code: touristAttraction.postal_code,
      latitude: touristAttraction.latitude,
      longitude: touristAttraction.longitude,
      created_at: touristAttraction.created_at,
      updated_at: touristAttraction.updated_at,
   };
}