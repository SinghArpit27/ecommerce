import bcrypt from 'bcrypt';
import { responseMessage, responseStatus, statusCode } from "../core/responseMessage.js";
import httpResponse from "../helper/httpResponse.js";

import db from '../config/database.js'
import sendVerifyMail from '../helper/userVerification.js';
const User = db.users;




// Generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}



class UserController{

    static async createUser(req,res){
        try {
            
            const checkEmail = await User.findOne({ where: { email: req.body.email } });
            console.log("Check Email: ", checkEmail);
            if(checkEmail == null){
                const checkPhone = await User.findOne({ where: { phone: req.body.phone } });
                if(checkPhone == null){

                    // Generate a new OTP and set the expiration time
                    const otp = generateOTP();
                    const otpExp = new Date(Date.now() + 30 * 60000).getTime(); // 30 minutes


                    // Create User Object
                    const newUserObject = {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: await bcrypt.hash(req.body.password, 10),
                        otp: otp,
                        otp_expiration_time: otpExp
                    }

                    // Create User
                    const userData = await User.create(newUserObject);

                    // Response Object
                    const responseData = {
                        Name: userData.name,
                        Email: userData.email,
                        Phone: userData.phone,
                        OTP: otp
                    }
                    
                    // Check user is Created or Not
                    if(userData){
                        sendVerifyMail(userData.name, userData.email, otp);
                        httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessage.USER_CREATED, responseData);
                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.REGISTRATION_FAILED);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.PHONE_ALREADY_EXIST);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.EMAIL_ALREADY_EXIST);
            }

        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
        }
    }

}

export default UserController;