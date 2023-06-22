import express, {Request, Response, NextFunction, Application} from 'express'
import { Server } from "http" 
import { errorResponse, notFound } from './middleware/errorHandler'
import { MessageInterface } from './interfaces/messageInterface'
import {config} from "dotenv"
import {MailService} from "./email/EmailClass"
import { EnquiryData, Options, MortgageApplication } from './interfaces/optionsInterface'
import createHttpError from "http-errors";
import bodyParser from "body-parser"
import cors from "cors"


const app : Application = express()
config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


app.post('/sendEnquiryMail', async (req : Request<{}, {}, EnquiryData, {}>, res : Response<MessageInterface>, next : NextFunction) => {
    try {
        console.log(req.body)

        var option : Options = {
            subject : "Property Enquiry"
        }
        var data : EnquiryData = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            propertyName : req.body.propertyName,
            enquiry : req.body.enquiry
        }

        let sendEmail = new MailService()
        await sendEmail.create_transport()
        await sendEmail.sendEnquiryMail(data, option)
    
        
        res.status(200),
        res.send({
            message : "Mail is Sent"
        })
    } catch (error) {
        next( new createHttpError.InternalServerError("Message could not be sent") )
    }
})

app.post('/sendApplicationMail', async (req : Request<{}, {}, MortgageApplication, {}>, res : Response<MessageInterface>, next : NextFunction) => {
    try {
        

        var option : Options = {
            subject : "Property Enquiry"
        }
        var data : MortgageApplication = {
            fullName : req.body.fullName,
            title : req.body.title,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            propertyName : req.body.propertyName,
            equity : req.body.equity,
            age : req.body.age,
            address : req.body.address,
            occupation : req.body.occupation,
            salaryEarned : req.body.salaryEarned,
            industry : req.body.industry,
        }

        let sendEmail = new MailService()
        await sendEmail.create_transport()
        await sendEmail.sendApplicationMail(data, option)
    
        
        res.status(200),
        res.send({
            message : "Mail is Sent"
        })
    } catch (error) {
        console.log(error)
        next( new createHttpError.InternalServerError("Message could not be sent") )
    }
})




app.use(notFound)
app.use(errorResponse)
const PORT : number = Number(process.env.PORT)
const server : Server = app.listen(PORT, () => console.log("🚀 app is running"))
