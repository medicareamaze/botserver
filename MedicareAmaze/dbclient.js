"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
class DbClient {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var option = {
                server: {
                    socketOptions: {
                        keepAlive: 300000,
                        connectTimeoutMS: 30000
                    }
                },
                replset: {
                    socketOptions: {
                        keepAlive: 300000,
                        connectTimeoutMS: 30000
                    }
                }
            };
            var options = {
                useMongoClient: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
            };
            try {
                // this.db = await MongoClient.connect("mongodb://main_admin:Vijay123@mongod-0.mongodb-service,mongod-1.mongodb-service,mongod-2.mongodb-service:27017/MedicareAmaze?replicaSet=MainRepSet&authSource=admin", option);
                // this.db = await mongoose.connect("mongodb://main_admin:Vijay123@mongod-0.mongodb-service,mongod-1.mongodb-service,mongod-2.mongodb-service:27017/MedicareAmaze?replicaSet=MainRepSet&authSource=admin", options);
                this.db = yield mongoose.connect("mongodb://localhost:27017/MedicareAmaze", options);
                console.log("Connected to db");
                // console.log(this.db)
                return this.db;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
module.exports = new DbClient();
//# sourceMappingURL=dbclient.js.map