import { AttractionApprovalResponse, toAttractionApprovalResponse} from '../model/attraction-approval-model';
import { prismaClient } from '../application/database';

export class AttractionApprovalService {
   static async getAll(): Promise<AttractionApprovalResponse[]> {
      // Retrieve all attraction approvals
      const attractionApprovals = await prismaClient.attractionApproval.findMany();

      // Return the attraction approval responses
      return attractionApprovals.map(toAttractionApprovalResponse);
   }
}