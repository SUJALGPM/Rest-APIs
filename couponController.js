const couponModel = require('../models/couponModel');
const { v4: uuidv4 } = require('uuid');

//Base IP address of system...
const Base = 'http://192.168.1.19:8050';

//Controller Generate ShortUrl Coupon......
const couponGenerateController = async (req, res) => {
    try {
        const { id, qrCodeName, title, companyName, Description, offer, location, couponCode, termCondition, ButtonName, visitUrl } = req.body;
        const img = req.file;

        //Generate a Unique ID...
        const uniqueID = uuidv4();

        //Check the coupon is already exist or not..
        const userExist = await couponModel.findOne({ ID: id });
        if (userExist) {
            res.status(201).send({ message: "Coupon already exist..!!", success: false });
        }

        //create a shortUrl...
        const shortUrl = `${Base}/coupon/${uniqueID}`;

        //Validation to ensure that data properly get in request...
        if(!id){
            res.status(404).send({message:"ID not found..!!",success:false});
        }else if(!qrCodeName){
            res.status(404).send({message:"QR Code Name is not found..!!",success:false});
        }

        //Format the data before store..
        const formatedData = {
            ID:id,
            qrCodeName: qrCodeName,
            shortUrl:shortUrl,
            image:img,
            companyName: companyName,
            title: title,
            Description: Description,
            offer: offer,
            location: location,
            couponCode: couponCode,
            termCondition: termCondition,
            ButtonName: ButtonName,
            visitUrl: visitUrl
        }

        //Store in database...
        const newCoupon = new couponModel(formatedData);
        const saveCoupon = await newCoupon.save();

        if(saveCoupon){
            res.status(201).send({message:"New coupon created successfully...",success:true});
        }        

    } catch (err) {
        console.log(err);
    }
}

module.exports = { couponGenerateController };