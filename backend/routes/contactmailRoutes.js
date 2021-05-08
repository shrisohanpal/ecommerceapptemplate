import express from 'express'
import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.route('/').post((req, res) =>
{
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAILID,
            pass: process.env.GMAILIDPASS
        }
    });


    var mailOptions = {
        from: process.env.GMAILID,
        to: process.env.GMAILID,
        subject: 'New Enquiry on IshMishDreams',
        html: `
        <h3>Name: ${req.body.name}</h3>
        <h3>Phone: ${req.body.phone}</h3>
        <h3>Email: ${req.body.email}</h3>
        <h3>Message: ${req.body.message}</h3>
        `
    };

    transporter.sendMail(mailOptions, function (error, info)
    {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

export default router 