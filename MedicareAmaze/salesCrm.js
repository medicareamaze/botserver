"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbClient = require("./dbclient");
const mongoose = require("mongoose");
exports.mongoose = mongoose;
;
exports.LeadSchema = new mongoose.Schema({
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
exports.LeadModel = mongoose.model('Lead', exports.LeadSchema);
class LeadManager {
    constructor(dbcon) {
        this.db = dbcon;
    }
    createLead(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.LeadModel.create({
                leadId: id,
                name: name
            });
        });
    }
    updateLead(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                exports.LeadModel.findByIdAndUpdate(lead._id, { lastConversationsByChannel: lead }).then((error) => {
                    resolve(true);
                }).catch((error) => {
                    console.log('Failed to update lead');
                    console.log(lead);
                    resolve(false);
                });
            });
        });
    }
    deleteLead(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                exports.LeadModel.findByIdAndRemove(lead._id).then((error) => {
                    resolve(true);
                });
            });
        });
    }
    log(event) {
        return __awaiter(this, void 0, void 0, function* () {
            //log the event somewhere
            if (this.db == undefined)
                this.db = yield DbClient.connect();
            this.db.collection("experimentLogs").insert(event);
        });
    }
}
exports.LeadManager = LeadManager;
const classes = { LeadManager };
function Experiments(name) {
    return classes[name];
}
exports.default = Experiments;
//# sourceMappingURL=salesCrm.js.map