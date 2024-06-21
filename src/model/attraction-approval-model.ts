import { AttractionApproval } from '@prisma/client';

export type AttractionApprovalResponse = {
   id: number;
   attraction_id: number;
   username: string;
   status: string;
   created_at: Date;
   updated_at: Date;
};
export function toAttractionApprovalResponse(attractionApproval: AttractionApproval): AttractionApprovalResponse {
   return {
      id: attractionApproval.id,
      attraction_id: attractionApproval.attraction_id,
      username: attractionApproval.username,
      status: attractionApproval.status,
      created_at: attractionApproval.created_at,
      updated_at: attractionApproval.updated_at,
   };
}