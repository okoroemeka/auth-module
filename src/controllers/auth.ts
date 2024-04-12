import  {  Request, Response } from 'express';
import {mockTravelRequestDatabase, mockUserDatabase} from "../db/mock";
import {createLead, generateToken} from "../util";
// import {query} from "../db";

async function CreateUser(req:Request, res:Response) {
    const {email, password, first_name, last_name, gender, phone, market,
        destination,
        destination_uuid,offer_preview_link,locale,
        preview_id,
        tracking_data,
        answers_data,
        app_id,
        brand,
        time_zone,
        experiments,
    } = req.body;


    // const user = await query('INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *', ['John Doe', 'emaka@gmail.com', 'Admin']);

    if (mockUserDatabase.find(user => user.email === email)) {
        return res.status(400).json({
            status: "Fail",
            message: "User already exists",
        });
    }

    const user ={
        id: mockUserDatabase.length + 1,
        email,
        password,
        first_name,
        last_name,
        gender,
        phone
    }

    mockUserDatabase.push(user);

   const leadRes = await createLead({
        FirstName: first_name,
        LastName: last_name,
        Email: email,
        Phone: phone,
        Gender__c: gender,
        Market__c: market,
        Destination__c: destination,
        leadsource: "Appointment"
   })

    const lead = await leadRes.json();
   const travelRequestInfo = {
       customerFullName: `${user.first_name} ${user.last_name}`,
       customerUuid: user.id,
       hasPhoneNumber: !!user.phone,
       previewId: preview_id,
       uuid: mockTravelRequestDatabase.length + 1,
   }
   mockTravelRequestDatabase.push(travelRequestInfo);

    res.status(200).json({
        status: "Success",
        message: "User created",
        data: {
            access_token: generateToken(user.email),
            user,
            lead,
            travel_request_info: travelRequestInfo
        }
    })
}

export {
    CreateUser
}