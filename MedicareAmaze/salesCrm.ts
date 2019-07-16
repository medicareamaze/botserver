import DbClient = require("./dbclient");
import mongoose = require('mongoose');

export interface Lead {
    leadId: string,
    name: string,
    email: string,
    mobileNumber: string,
    landLine: string,
    zip: string,
    dateOfBirth: Date,
    leanIntents:string [],
    eligibleProductTypes: string[],
    interestedProductTypes: string[],
    offeredProducts: string[],
    interestedProducts: string[],
    webPushSubscription: String[],
    androidPushSubscription: String[],
    iosPushSubscription: String[],
    isAgent: boolean
   
};
export const LeadSchema = new mongoose.Schema({
    leadId: String,
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    mobileNumber: { type: String, default: '' },
    landLine: { type: String, default: '' },
    zip: { type: String, default: '' },
    dateOfBirth: { type: Date, default: new Date('1/1/1950') },
    leadIntent: { type: [String], default: [] },
    eligibleProductTypes: { type: [String], default: [] },
    interestedProductTypes: { type: [String], default: [] },
    offeredProducts: { type: [String], default: [] },
    interestedProducts: { type: [String], default: [] },
    webPushSubscription: { type: [String], default: [] },
    androidPushSubscription: { type: [String], default: [] },
    iosPushSubscription: { type: [String], default: [] },
    isAgent: { type: Boolean, default: false }
});

export interface LeadDocument extends Lead, mongoose.Document { }
export const LeadModel = mongoose.model<LeadDocument>('Lead', LeadSchema);  
export { mongoose };

export class LeadManager   {
    
    private  db: any;
    constructor(dbcon:any) {
        
        this.db = dbcon;
        
    }
    private async createLead(id: string, name: string): Promise<Lead> {
        return await LeadModel.create({
            leadId: id,
            name: name
        });
    }

    private async updateLead(lead: Lead): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
           
            LeadModel.findByIdAndUpdate((lead as any)._id, { lastConversationsByChannel: lead }).then((error) => {
                resolve(true)
            }).catch((error) => {
                console.log('Failed to update lead');
                console.log(lead as any);
                resolve(false);
            });
        });
    }

    private async deleteLead(lead: Lead): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            LeadModel.findByIdAndRemove((lead as any)._id).then((error) => {
                resolve(true);
            })
        });
    }
   

   
    async log(event) {
        //log the event somewhere
        if (this.db == undefined) this.db = await DbClient.connect();
        this.db.collection("experimentLogs").insert(event);
    }

   
   

}


const classes = { LeadManager };

export default function Experiments(name) {
    return classes[name];
}



