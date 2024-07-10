import nodemailer from "nodemailer"
import {emailHtml} from "./emailHtml.js"
export const sendMail= async(email,otp)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'mernae711@gmail.com',
            pass:'kchj ytdw nfab ngjn'
            
        },
    })
    const info= await transporter.sendMail({
        from:'"Saraha" mernae711@gmail.com',
        to:email,
        subject:'saraha testt',
        html:emailHtml(otp)
    })
    console.log('Message sent: %s', info.messageId);
} 