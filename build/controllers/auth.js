"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const mock_1 = require("../db/mock");
const util_1 = require("../util");
// import {query} from "../db";
function CreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, first_name, last_name, gender, phone, market, destination, destination_uuid, offer_preview_link, locale, preview_id, tracking_data, answers_data, app_id, brand, time_zone, experiments, } = req.body;
        // const user = await query('INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *', ['John Doe', 'emaka@gmail.com', 'Admin']);
        if (mock_1.mockUserDatabase.find(user => user.email === email)) {
            return res.status(400).json({
                status: "Fail",
                message: "User already exists",
            });
        }
        const user = {
            id: mock_1.mockUserDatabase.length + 1,
            email,
            password,
            first_name,
            last_name,
            gender,
            phone
        };
        mock_1.mockUserDatabase.push(user);
        const leadRes = yield (0, util_1.createLead)({
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Phone: phone,
            Gender__c: gender,
            Market__c: market,
            Destination__c: destination,
            leadsource: "Appointment"
        });
        const lead = yield leadRes.json();
        const travelRequestInfo = {
            customerFullName: `${user.first_name} ${user.last_name}`,
            customerUuid: user.id,
            hasPhoneNumber: !!user.phone,
            previewId: preview_id,
            uuid: mock_1.mockTravelRequestDatabase.length + 1,
        };
        mock_1.mockTravelRequestDatabase.push(travelRequestInfo);
        res.status(200).json({
            status: "Success",
            message: "User created",
            data: {
                access_token: (0, util_1.generateToken)(user.email),
                user,
                lead,
                travel_request_info: travelRequestInfo
            }
        });
    });
}
exports.CreateUser = CreateUser;
