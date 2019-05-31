// Imports
const express = require("express")
const router = express.Router()
const User = require("../models/user")
const CV = require("../models/cv")
const Competition = require("../models/competition")
const Apply = require("../models/applies")
const Time = require("../models/time")
const Fair = require("../models/fair")
const Image = require("../models/image")
const mongoose = require("mongoose")
const db = "mongodb://localhost:27017/pia"
const jwt = require("jsonwebtoken")
const multer = require('multer');
const upload = multer({dest : 'uploads/'});
let picture_username="blabla";

mongoose.connect(db, error => {
    if(error) 
    {
        console.error("Error ", error)
    }
    else
    {
        console.log("Connected to mongodb ")
    }
})

function verifyToken(request, response, next)
{
    if(!request.headers.authorization)
    {
        return response.status(401).send("Unauthorized request")
    }

    // Bearer [0] , Token [1]
    let token = request.headers.authorization.split(" ")[1]
    if(token === "null")
    {
        return response.status(401).send("Unauthorized request")
    }
    let payload = jwt.verify(token, "secretKey")
    if(!payload)
    {
        return response.status(401).send("Unauthorized request")
    }

    request.userID = payload.subject
    next()
}

// Handle the get request
/*
router.get("/", verifyToken, (request, response) => {
    response.send("From API route")
})
*/
router.get("/", (request, response) => {
    response.send("From API route")
})

// Handle the post request for registering user
router.post("/register", (request, response) => {
    let userData = request.body
    let user = new User(userData)
    // Save gives us an error or registered user
    user.save((error, registeredUser) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            picture_username = user.Username;
            let payload = { "subject": registeredUser._id}
            let tokenM = jwt.sign(payload, "secretKey")
            //Status 200 = OK
            response.status(200).send({token: tokenM, grad: user.Graduated, email: user.Email})
        }
    })    
})

router.post("/login", (request, response) => {
    let userData = request.body
    User.findOne({ "Email" : userData.email}, (error, user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                response.status(401).send({message: "Invalid email!"})
            }
            else if(user.Password !== userData.password)
            {
                response.status(401).send({message: "Invalid password!"})
            }
            else
            {
                let payload = { "subject": user._id}
                let tokenM = jwt.sign(payload, "secretKey")
                response.status(200).send({token: tokenM, grad: user.Graduated, email: user.Email, user_type: user.user_type, username: user.Username})
            }
        }
    })
})

router.post("/change_password", (request, response) => {
    let userData = request.body
    User.findOne({ "Email" : userData.email}, (error, user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                response.status(401).send({message: "Invalid email!"})
            }
            else if(user.Password !== userData.currentPassword)
            {
                response.status(401).send({message: "Invalid password!"})
            }
            else
            {
                User.updateOne({"Email" : userData.email }, {$set: {"Password" : userData.newPassword}}, (error, result) => {
                    if(error)
                    {
                        console.log(error)
                    }
                    else
                    {
                        console.log(result)
                    }
                })
                response.status(200).send({message: "Successfully changed password"})
            }
        }
    })
})

router.get("/student/:email", (request, response)=>{
    User.findOne({"Email":request.params.email}, (err, user)=>{
        if (err) console.log(err);
        else {
            response.json(user);
        }
    })
})

router.post("/cvCreate", (request, response) => {
    let cvData = request.body
    let cv = new CV(cvData)
    // Save gives us an error or registered user
    cv.save((error, registeredCv) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log(registeredCv)
        }
    })
    
    User.findOne({ "Email" : cvData.Email}, (error, user) => {

        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                console.log("EMAIL" + cvData.Email)
                response.status(401).send({message: "Invalid email!"})
            }
            else
            {
                User.updateOne({"Email" : cvData.Email }, {$set: {"Created_CV" : "Yes"}}, (error, result) => {
                    if(error)
                    {
                        console.log(error)
                    }
                    else
                    {
                        console.log(result)
                    }
                })
                response.status(200).send({createdCV: user.Created_CV})
            }
        }
    })
})

router.post("/companies",(request, response)=>{
if (request.body.Company_Name == "") {
    User.find({"user_type":"company"}, (err, companies)=>{
        if(err) console.log(err);
        else{
            response.json(companies);
        }
    })
} else {
User.find({Company_Name:{$regex:request.body.Company_Name}}, (err, companies)=>{
        if(err) console.log(err);
        else{
            response.json(companies);
        }
    })
}
})

router.post("/competitions",(request, response)=>{
console.log(request.body.Competition_Name);
console.log(request.body.type);
if (request.body.type == "both") {
    console.log("sad sam ovde");
    Competition.find({Competition_Name:{$regex:request.body.Competition_Name}}, (err, competitions)=>{
        if(err) console.log(err);
        else {
            response.json(competitions);
        }
    });
} else {
console.log("a sad ovde");
Competition.find({Competition_Name:{$regex:request.body.Competition_Name}, Type:request.body.type}, (err, competitions)=>{
        if(err) console.log(err);
        else{
            console.log(competitions);
            response.json(competitions);
        }
    })
}
});


router.get("/company/:search_type1",(request, response)=>{
    User.findOne({'_id':request.params.search_type1}, (err, company)=>{
        if(err) console.log(err);
        else{
            response.json(company);
        }
    })
})

router.get("/competition/:search_type1",(request, response)=>{
    
    Competition.findOne({'_id':request.params.search_type1}, (err, company)=>{
        if(err) console.log(err);
        else{
            response.json(company);
        }
    })
})

router.get("/competitionsByCompany/:company_id",(request, response)=>{
    Competition.find({'Company_ID':request.params.company_id}, (err, competitions)=>{
        if(err) console.log(err);
        else{
            response.json(competitions);
        }
    })
})

router.get("/cv/:user_email",(request,response)=>{
    CV.find({'email':request.params.user_email}, (err, cv)=>{
        if(err) console.log(err);
        else {
            response.json(cv);
        }
    })
})

router.route("/editCv").post((req,res)=>{
    CV.find({"username":req.body.username},(err,obj)=>{
        if (err) console.log(err);
        else {
        if (obj.length>0)
        {
            console.log("update cv");
            CV.updateOne({"username":req.body.username},req.body,(err,cvv)=>{
                if (err)
                    console.log(err);
                else
                    res.json(cvv); 
            });
        }else{
            console.log("new cv");
            let x = new CV(req.body);
            x.save().then(x=>{
                console.log(x);
                res.status(200).json({'cv':'ok'});
            }).catch(err=>{
                res.status(400).json({'cv':'no'});
            });
        }
    }})
});

router.route('/uploadNewImages').post(upload.single('image'), (req, res, next)=>{
    
    let img = new Image({"Username":picture_username,"image":req.file.filename});
    console.log(img);
    img.save().
        then(img=>{
            res.status(200).json({'message':'success'});
        }).catch(err=>{
            res.status(400).json({'message':'error'});
        });
    

});
router.route('/files').post(upload.single('image'), (req, res, next)=>{
    res.status(200).json(req.file.filename);                        

});

router.post("/apply", (request, response) => {
    let applyData = request.body
    console.log(applyData);
    let apply = new Apply(applyData)
    // Save gives us an error or registered user
    apply.save((error, applied) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log("usao")
            response.status(200).send(applied)
        }
    })    
})

router.get("/companyByEmail/:email",(request,response)=>{
    User.findOne({'Email':request.params.email}, (err, user)=>{
        if(err) console.log(err);
        else {
            response.json(user);
        }
    })
})

router.post("/createCompetition", (request, response) => {
    let competitionData = request.body
    console.log(competitionData);
    let competition = new Competition(competitionData)
    // Save gives us an error or registered user
    competition.save((error, createdComp) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log("usao")
            response.status(200).send(createdComp)
        }
    })    
})

router.get("/myAppliesUrl/:email",(request,response)=>{
    console.log(request.params.email)
    Apply.find({'Email':request.params.email}, (err, applies)=>{
        if(err) console.log(err);
        else {
            response.json(applies);
        }
    })
});

router.route("/finishComp").post((req,res)=>{
    Competition.updateOne({"_id":req.body._id}, {"End":true},(err,obj)=>{
        if (err)
            console.log(err);
        else
            res.json(obj); 
    });
});

router.route("/changeStatus").post((req,res)=>{
    console.log(req.body._id);
    console.log(req.body.status);
    Apply.updateOne({"_id":req.body._id}, {"Accepted":req.body.status},(err,obj)=>{
        if (err)
            console.log(err);
        else
            console.log("ovde sam");
            console.log(obj);
            res.json(obj); 
    });
});

router.route("/getOffers").post(
    (req,res)=>{
        if (req.body.name==undefined) req.body.name="";
        if (req.body.type!=undefined)
            Competition.find({name:new RegExp(".*"+req.body.name+".*"), type:req.body.type},(err,obj)=>{if (err) console.log(err);else res.json(obj);});
        else
            Competition.find({"Competition_Name":new RegExp(".*"+req.body.name+".*")},(err,obj)=>{if (err) console.log(err);else res.json(obj);});
    }
);

router.route("/allCompetitions").post(
    (req,res)=>{
        Apply.find({},(err,obj)=>{if (err) console.log(err);else res.json(obj);});
   }
);

router.route("/timeCompany").post((req,res)=>{
    Time.update({type:"company"}, {from:req.body.from, to:req.body.to}, { upsert : true },(err,obj)=>{
        if (err)
            console.log(err);
        else
            res.json(obj); 
    });
});

router.route("/timeCV").post((req,res)=>{
    Time.update({type:"student"}, {from:req.body.from, to:req.body.to}, { upsert : true },(err,obj)=>{
        if (err)
            console.log(err);
        else
            res.json(obj); 
    });
});

router.route("/getTime").post((req,res)=>{
    Time.find({type:req.body.type},(err,obj)=>{
        if (err)
            console.log(err);
        else
            res.json(obj);    
    });
});

router.route("/getCurrentFair").post((req,res)=>{
    let current = new Date();
    let current_minute=current.getMinutes()<10?"0":"";
    let current_second=current.getSeconds()<10?"0":"";
    let current_month=current.getMonth()<10?"0":"";
    let current_day=current.getUTCDate()<10?"0":"";
    let current_hour=current.getHours()<10?"0":"";

    let current_date= current.getFullYear()+"-"+current_month + (current.getMonth()+1)+"-"+current_day+(current.getUTCDate());
    let current_time= current_hour + current.getHours()+":"+current_minute + current.getMinutes()+":"+current_second + current.getSeconds();
   
    Fair.find( { $or: [ {FromDate:current_date,FromTime:{ $lt: current_time}}, {ToDate:current_date,ToTime:{ $gt: current_time}},{FromDate:{ $lt: current_date},ToDate:{ $gt: current_date}} ] },(err,obj)=>{
        if (err)
            console.log(err);
        else
            res.json(obj);    
    });
});

router.route("/addNewFair").post( (req,res)=>{
        fairData = req.body;
        let fair= new Fair();
        fair.Fair_Name = fairData.Fair;
        fair.Informations = fairData.About;
        fair.Locations = fairData.Locations;
        fair.Place = fairData.Place;
        fair.FromDate = fairData.StartDate;
        fair.ToDate = fairData.EndDate;
        fair.FromTime = fairData.EndTime;
        fair.Packages = fairData.Packages;
        fair.LogoImage = fairData.LogoImage;
        fair.Slots = fairData.Slots;
        fair.Additional = fairData.Additional;
        fair.save().then(a=>{
            res.status(200).json({"message":"success"});
        }).catch(err=>{
            res.status(400).json({"message":"error"});
        });
    }
);

router.route("/guest").post((request, response)=>{
    if (request.body.Activity!=undefined)
            User.find({"Company_Name":new RegExp(".*"+request.body.Company_Name+".*"), "Activity":new RegExp(request.body.Activity), "City":new RegExp(".*"+request.body.City+".*")},(err,company)=>{if (err) console.log(err);else { console.log(company); response.json(company);}});
        else
            User.find({"Company_Name":new RegExp(".*"+request.body.Company_Name+".*"), "City":new RegExp(".*"+request.body.City+".*")},(err,company)=>{if (err) console.log(err);else response.json(company);});
        
})

// Exoport the router
module.exports = router