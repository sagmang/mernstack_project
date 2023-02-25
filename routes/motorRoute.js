const express = require("express");
const router = express.Router();
const Motor = require("../models/motorModel");
const Brand = require("../models/brandModel");
const Model = require("../models/modelModel");
const Fuel = require("../models/fuelModel");
const Variant = require("../models/variantModel");
const RegLocation = require("../models/locationModel");
const RegYear = require("../models/yearModel");
const CarDetail = require("../models/cardetailModel");
const Life = require("../models/lifeModel")
const User = require("../models/loginModel");
const Health = require("../models/healthModel");
const mongoose = require("mongoose");
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const nodemailer = require('nodemailer');


const Page = require("../models/slugpageModel");

const Whatsapp = require("../models/whatsappbotModel");



router.route("/create").post((req,res) => {
    const motor = req.body.motor
    // Create the new motor
    const newMotor = new Motor({
        motor
    });
    // Save the new motor to the database
    newMotor.save();
})

router.route("/view").get((req, res) => {
    Motor.find()
    .then(foundMotor => res.json(foundMotor))
})

router.route("/brandcreate").post(async (req,res) => {
    const brand = req.body.brand
    const brandId = mongoose.Types.ObjectId(req.body.motor)
    // Create the new brand
    const newBrand = new Brand({
      brand,
      motor: brandId
    }); 
    // Save the new brand to the database
    try{
      await newBrand.save()
      res.json(newBrand);
    } catch(err) {
      res.status(400).json('Error: ' + err);
    }
});

router.route("/brandview").get((req, res) => {
  Brand.find()
  .then(foundBrand => res.json(foundBrand))
})

router.route("/brandview/:motorId").get((req, res) => {
  const { motorId } = req.params;
  Brand.find({ motor: motorId }).populate('motor')
  .then(foundBrand => res.json(foundBrand))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/modelcreate").post(async (req,res) => {
  const motorId = mongoose.Types.ObjectId(req.body.motor);
  const brandId = mongoose.Types.ObjectId(req.body.brand);

  // Check if the selected motor exists
  const motor = await Motor.findById(motorId);
  if (!motor) {
    return res.status(400).json({ message: 'Invalid motor selected' });
  }

  // Check if the selected brand is associated with the selected motor
  const brand = await Brand.findOne({ _id: brandId, motor: motorId });
  if (!brand) {
    return res.status(400).json({ message: 'Invalid brand selected' });
  }

  // Create the new model
  const newModel = new Model({
    model: req.body.model,
    brand: brandId,
    motor: motorId
  });

  // Save the new model to the database
  try {
    await newModel.save();
    res.json(newModel);
  } catch (err) {
    res.status(400).json({ message: 'Error: ' + err });
  }
});

router.route("/modelview").get((req, res) => {
  Model.find()
  .then(foundModels => res.json(foundModels))
})

router.route("/modelview/:brandId").get(async (req, res) => {
  const { brandId } = req.params;

  // Find all models associated with the selected brand and motor
  const foundModelss = await Model.find({ brand: brandId }).populate('brand');

  res.json({ foundModelss });
});


router.route("/modelview/:brandId/:motorId").get(async (req, res) => {
  const { brandId, motorId } = req.params;

  // Find all models associated with the selected brand and motor
  const foundModels = await Model.find({ brand: brandId, motor: motorId });

  res.json({ foundModels });
});


router.route("/fuelcreate").post(async (req, res) => {
  const modelId = mongoose.Types.ObjectId(req.body.model);
  const brandId = mongoose.Types.ObjectId(req.body.brand);
  const motorId = mongoose.Types.ObjectId(req.body.motor);

  // Check if the selected model exists
  const model = await Model.findById(modelId);
  if (!model) {
      return res.status(400).json({ message: 'Invalid model selected' });
  }

  // Check if the selected brand is associated with the selected model
  if (model.brand.toString() !== brandId.toString()) {
      return res.status(400).json({ message: 'Invalid brand selected' });
  }

  // Check if the selected motor is associated with the selected model
  if (model.motor.toString() !== motorId.toString()) {
      return res.status(400).json({ message: 'Invalid motor selected' });
  }

  // Create the new fuel
  const newFuel = new Fuel({
      fuel: req.body.fuel,
      model: modelId,
      brand: brandId,
      motor: motorId
  });

  // Save the new fuel to the database
  try {
      await newFuel.save();
      res.json(newFuel);
  } catch (err) {
      res.status(400).json({ message: 'Error: ' + err });
    }
});

router.route("/fuelview/:modelId/:brandId/:motorId").get(async (req, res) => {
  const { modelId, brandId, motorId } = req.params;

  // Find all fuels associated with the selected model, brand and motor
  const foundFuels = await Fuel.find({ model:modelId, brand: brandId, motor: motorId });

  res.json({ foundFuels });
});

router.route("/fuelview/:modelId").get(async (req, res) => {
  const { modelId } = req.params;

  // Find all fuels associated with the selected model
  const foundFuelss = await Fuel.find({ model:modelId }).populate('model');

  res.json({ foundFuelss });
});


router.route("/variantcreate").post(async (req, res) => {
  const fuelId = mongoose.Types.ObjectId(req.body.fuel);
  const modelId = mongoose.Types.ObjectId(req.body.model);
  const brandId = mongoose.Types.ObjectId(req.body.brand);
  const motorId = mongoose.Types.ObjectId(req.body.motor);

  // Check if the selected fuel exists
  const fuel = await Fuel.findById(fuelId);
  if (!fuel) {
      return res.status(400).json({ message: 'Invalid fuel selected' });
  }

  // Check if the selected model is associated with the selected fuel
  if (fuel.model.toString() !== modelId.toString()) {
    return res.status(400).json({ message: 'Invalid model selected' });
  }

  // Check if the selected brand is associated with the selected fuel
  if (fuel.brand.toString() !== brandId.toString()) {
      return res.status(400).json({ message: 'Invalid brand selected' });
  }

  // Check if the selected motor is associated with the selected fuel
  if (fuel.motor.toString() !== motorId.toString()) {
      return res.status(400).json({ message: 'Invalid motor selected' });
  }

  // Create the new variant
  const newVariant = new Variant({
      variant: req.body.variant,
      fuel: fuelId,
      model: modelId,
      brand: brandId,
      motor: motorId
  });

  // Save the new variant to the database
  try {
      await newVariant.save();
      res.json(newVariant);
  } catch (err) {
      res.status(400).json({ message: 'Error: ' + err });
    }
});

router.route("/variantview/:fuelId/:modelId/:brandId/:motorId").get(async (req, res) => {
  const { fuelId, modelId, brandId, motorId } = req.params;

  // Find all variants associated with the selected fuel, model, brand and motor
  const foundVariants = await Variant.find({ fuel:fuelId, model:modelId, brand: brandId, motor: motorId });

  res.json({ foundVariants });
});

router.route("/variantview/:fuelId").get(async (req, res) => {
  const { fuelId } = req.params;

  // Find all variants associated with the selected fuel
  const foundVariantss = await Variant.find({ fuel:fuelId }).populate('fuel');

  res.json({ foundVariantss });
});

router.route("/reglocationcreate").post(async (req, res) => {
  const variantId = mongoose.Types.ObjectId(req.body.variant);
  const fuelId = mongoose.Types.ObjectId(req.body.fuel);
  const modelId = mongoose.Types.ObjectId(req.body.model);
  const brandId = mongoose.Types.ObjectId(req.body.brand);
  const motorId = mongoose.Types.ObjectId(req.body.motor);

  // Check if the selected variant exists
  const variant = await Variant.findById(variantId);
  if (!variant) {
      return res.status(400).json({ message: 'Invalid variant selected' });
  }

  // Check if the selected fuel is associated with the selected variant
  if (variant.fuel.toString() !== fuelId.toString()) {
    return res.status(400).json({ message: 'Invalid fuel selected' });
  }

  // Check if the selected model is associated with the selected variant
  if (variant.model.toString() !== modelId.toString()) {
    return res.status(400).json({ message: 'Invalid model selected' });
  }

  // Check if the selected brand is associated with the selected variant
  if (variant.brand.toString() !== brandId.toString()) {
      return res.status(400).json({ message: 'Invalid brand selected' });
  }

  // Check if the selected motor is associated with the selected variant
  if (variant.motor.toString() !== motorId.toString()) {
      return res.status(400).json({ message: 'Invalid motor selected' });
  }

  // Create the new RegLocation
  const newRegLocation = new RegLocation({
      reglocation: req.body.reglocation,
      variant: variantId,
      fuel: fuelId,
      model: modelId,
      brand: brandId,
      motor: motorId
  });

  // Save the new RegLocation to the database
  try {
      await newRegLocation.save();
      res.json(newRegLocation);
  } catch (err) {
      res.status(400).json({ message: 'Error: ' + err });
    }
});

router.route("/reglocationview/:variantId/:fuelId/:modelId/:brandId/:motorId").get(async (req, res) => {
  const { variantId, fuelId, modelId, brandId, motorId } = req.params;

  // Find all reglocation associated with the selected variant, fuel, model, brand and motor
  const foundRegLocations = await RegLocation.find({ variant:variantId, fuel:fuelId, model:modelId, brand: brandId, motor: motorId });

  res.json({ foundRegLocations });
});

router.route("/reglocationview/:variantId").get(async (req, res) => {
  const { variantId } = req.params;

  // Find all reglocation associated with the selected variant
  const foundRegLocationss = await RegLocation.find({ variant:variantId }).populate('variant');

  res.json({ foundRegLocationss });
});

router.route("/regyearcreate").post(async (req, res) => {
  const reglocationId = mongoose.Types.ObjectId(req.body.reglocation);
  const variantId = mongoose.Types.ObjectId(req.body.variant);
  const fuelId = mongoose.Types.ObjectId(req.body.fuel);
  const modelId = mongoose.Types.ObjectId(req.body.model);
  const brandId = mongoose.Types.ObjectId(req.body.brand);
  const motorId = mongoose.Types.ObjectId(req.body.motor);

  // Check if the selected reglocation exists
  const reglocation = await RegLocation.findById(reglocationId);
  if (!reglocation) {
      return res.status(400).json({ message: 'Invalid reglocation selected' });
  }

  // Check if the selected variant is associated with the selected reglocation
  if (reglocation.variant.toString() !== variantId.toString()) {
    return res.status(400).json({ message: 'Invalid variant selected' });
  }

  // Check if the selected fuel is associated with the selected reglocation
  if (reglocation.fuel.toString() !== fuelId.toString()) {
    return res.status(400).json({ message: 'Invalid fuel selected' });
  }

  // Check if the selected model is associated with the selected reglocation
  if (reglocation.model.toString() !== modelId.toString()) {
    return res.status(400).json({ message: 'Invalid model selected' });
  }

  // Check if the selected brand is associated with the selected reglocation
  if (reglocation.brand.toString() !== brandId.toString()) {
      return res.status(400).json({ message: 'Invalid brand selected' });
  }

  // Check if the selected motor is associated with the selected reglocation
  if (reglocation.motor.toString() !== motorId.toString()) {
      return res.status(400).json({ message: 'Invalid motor selected' });
  }

  // Create the new RegYear
  const newRegYear = new RegYear({
      regyear: req.body.regyear,
      reglocation: reglocationId,
      variant: variantId,
      fuel: fuelId,
      model: modelId,
      brand: brandId,
      motor: motorId
  });

  // Save the new RegYear to the database
  try {
      await newRegYear.save();
      res.json(newRegYear);
  } catch (err) {
      res.status(400).json({ message: 'Error: ' + err });
    }
});

router.route("/regyearview/:reglocationId").get(async (req, res) => {
  const { reglocationId } = req.params;

  // Find all regyear associated with the selected reglocation
  const foundRegYearss = await RegYear.find({ reglocation: reglocationId }).populate('reglocation');

  res.json({ foundRegYearss });
});

router.post('/cardetailcreate', (req, res) => {
  const CarDetailData = new CarDetail(req.body);
  CarDetailData.save()
    .then(() => {
      res.json({
        success: true,
        message: 'CarDetail data inserted successfully'
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: 'Failed to insert CarDetail data',
        error: err
      });
    });
});

router.post('/lifecreate', async (req, res) => {
  try {
  const life = new Life({
  gender: req.body.gender,
  age: req.body.age,
  phone: req.body.phone,
  smokeOrChew: req.body.smokeOrChew,
  occupation: req.body.occupation,
  annualIncome: req.body.annualIncome,
  educationalQualification: req.body.educationalQualification,
  cover: req.body.cover,
  coverupto: req.body.coverupto,
  wishtopay: req.body.wishtopay
  });
  await life.save();

  res.status(201).send(life);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.get('/latestLife', async (req, res) => {

  try {
    const latestLife = await Life.find({}).sort({ _id: -1 }).limit(1);
    res.status(200).send(latestLife);
    // console.log(latestLife)
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
});

router.get('/life/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Life.findById(id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).send('Error fetching document');
  }
});


router.patch('/life/:id', async (req, res) => {
  try {
    const life = await Life.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).send(life);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/lifeview', (req, res) => {
  Life.find({}, 'gender age', (err, lives) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(lives);
      }
  });
});



// Route to send OTP
router.post('/send-otp', async (req, res) => {
  try {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save OTP in database
    const newOtp = new User({
      mobileNumber: req.body.mobileNumber,
      otp: otp
    });
    await newOtp.save();

    // Send OTP via SMS
    const client = new twilio('ACaacd0735249ee88c5b58958f5767c87a', '7b07a31e3029dc65c8857e03df23124b');
    const message = await client.messages.create({
      to: req.body.mobileNumber,
      from: "+16304746893",
      body: `Your OTP is: ${otp}`
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    // Find OTP in database
    const otp = await User.findOne({
      mobileNumber: req.body.mobileNumber,
      otp: req.body.otp
    });

    // Check if OTP is correct
    if (!otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Delete OTP from database
    // await User.deleteOne({ _id: otp._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).
  json({ error: error.message });
  }
})

router.post('/email', (req, res) => {

  const {email} = req.body;
  try {

    const transporter = nodemailer.createTransport({
      service:"outlook",
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:"Test mail",
      html:'<h1>This is a system generated email do not reply </h1>'
    }

    // Send the email with a delay of 15 seconds
    setTimeout(() => {
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.log("Error", error);
        }else{
          console.log("Email sent" + info.response);
          res.status(201).json({status:201,info})
        }
      })
    }, 15000);

  } catch (error) {
    res.status(201).json({status:401,error})
  }
})


router.post("/health", async (req, res) => {
  try {
    const {
      health_gender,
      health_daughter_count,
      health_son_count,
      health_age_details,
      health_address_details,
    } = req.body;

    const newHealth = new Health({
      health_gender,
      health_daughter_count,
      health_son_count,
      health_age_details,
      health_address_details,
    });

    await newHealth.save();

    res.status(201).json({ message: "Health data created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Slug value based Page content 

router.route('/pages').post((req, res) => {
  const { slug, content } = req.body;

  const newPage = new Page({
    slug: slug,
    content: content,
  });

  newPage.save((err, page) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating page');
    } else {
      console.log(`Created new page with slug ${page.slug}`);
      res.status(201).send('Page created successfully');
    }
  });
});

router.route('/pages/:slug').get((req, res) => {
  const slug = req.params.slug;

  Page.findOne({ slug }, (err, page) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error getting page');
    } else if (!page) {
      res.status(404).send('Page not found');
    } else {
      res.send(page);
    }
  });
});


//WhatsappBot
// account SID and auth token
const accountSid = 'ACaacd0735249ee88c5b58958f5767c87a';
const authToken = '7b07a31e3029dc65c8857e03df23124b';
const client = require('twilio')(accountSid, authToken);

router.post('/messages', (req, res) => {
    const twiml = new twilio.twiml.MessagingResponse();
    const messageBody = req.body.Body.toLowerCase();
  // Check if the message is "hi"
  if (messageBody === 'hi') {
    // Respond with "hello"
    client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: 'whatsapp:' + req.body.From,
      body: 'hello'
    })
    .then(() => {
      res.send('');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
    });
  } else {
    // Respond with "from you"
    client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: 'whatsapp:' + req.body.From,
      body: 'from you'
    })
    .then(() => {
      res.send('');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
    });
  }
  });  

 
module.exports = router;