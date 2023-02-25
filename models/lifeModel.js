const mongoose = require('mongoose');

const lifeSchema = new mongoose.Schema({
gender: {
    type: String,
    default: 'male',
    enum: ['male', 'female']
},
age: String,
phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
},
smokeOrChew: {
    type: String,
    default: 'no',
    enum: ['yes', 'no']
},
occupation: {
    type: String,
    default: 'salaried',
    enum: ['salaried', 'self-employed']
},
annualIncome: {
    type: String,
    required: true,
    enum: ['2 lakh', '3 lakh', '4 lakh', '5 lakh', '6 lakh', '7 lakh',  '8 lakh', '9 lakh', '10 lakh', '11 lakh', '12 lakh', '13 lakh', '14 lakh', '15 lakh', '16 lakh', '17 lakh', '18 lakh', '19 lakh', '20 lakh',  '21 lakh', '22 lakh', '23 lakh', '24 lakh', '25 lakh', '26 lakh', '27 lakh', '28 lakh', '29 lakh', '30 lakh', '31 lakh', '32 lakh', '33 lakh',  '34 lakh', '35 lakh', '36 lakh', '37 lakh', '38 lakh', '39 lakh', '40 lakh', '41 lakh', '42 lakh', '43 lakh', '44lakh', '45 lakh', '46 lakh',  '47 lakh', '48 lakh', '49 lakh', '50 lakh', '51lakh', '52 lakh', '53 lakh', '54 lakh', '55 lakh', '56 lakh', '57 lakh', '58 lakh', '59 lakh',  '60 lakh', '61 lakh', '62 lakh', '63 lakh', '64 lakh', '65 lakh', '66 lakh', '67 lakh', '68 lakh', '69 lakh', '70 lakh', '71 lakh', '72 lakh',  '73 lakh', '74 lakh', '75 lakh', '76 lakh', '77 lakh', '78 lakh', '79 lakh', '80 lakh', '81 lakh', '82 lakh', '83 lakh', '84 lakh', '85 lakh',  '86 lakh', '87 lakh', '88 lakh', '89 lakh', '90 lakh', '91 lakh', '92 lakh', '93 lakh', '94 lakh', '95 lakh', '96 lakh','97 lakh', '98 lakh', '99 lakh', '+99 lakh']
},
educationalQualification: {
    type: String,
    required: true,
    enum: ['10th Pass', '12th Pass', 'Graduate', 'Post Graduate & Above']
},
cover: {
    type: String,
    required: true,
    enum: ['10 lakh', '20 lakh', '25 lakh', '30 lakh', '40 lakh', '50 lakh', '60 lakh', '70 lakh', '75 lakh', '80 lakh', '90 lakh', '1 crore', '1.10 crore', '1.20 crore', '1.30 crore', '1.40 crore', '1.50 crore', '1.75 crore', '2 crore', '2.50 crore', '3 crore', '3.50 crore', '4 crore', '4.50 crore', '5 crore', '6 crore', '7 crore', '8 crore', '9 crore', '10 crore', '11 crore', '12 crore', '13 crore', '14 crore', '15 crore', '16 crore', '17 crore', '18 crore', '19 crore', '20 crore']
  },
  coverupto: {
    type: String,
    required: true,
    enum: ['23 years', '24 years', '25 years', '26 years', '27 years', '28 years', '29 years', '30 years', '31 years', '32 years', '33 years', '34 years', '35 years', '36 years', '37 years', '38 years', '39 years', '40 years', '41 years', '42 years', '43 years', '44 years', '45 years', '46 years', '47 years', '48 years', '49 years', '50 years', '51 years', '52 years', '53 years', '54 years', '55 years', '56 years', '57 years', '58 years', '59 years', '60 years', '61 years', '62 years', '63 years', '64 years', '65 years', '66 years', '67 years', '68 years', '69 years', '70 years', '71 years', '72 years', '73 years', '74 years', '75 years', '76 years', '77 years', '78 years', '79 years', '80 years', '81 years', '82 years', '83 years', '84 years', '85 years', '86 years', '87 years', '88 years', '89 years', '90 years', '91 years', '92 years', '93 years', '94 years', '95 years', '96 years', '97 years', '98 years', '99 years', '100 years']
  },
  wishtopay: {
    type: String,
    required: true,
    enum: ['Monthly', 'Quarterly', 'Half yearly', 'Yearly']
  }
});

const Life = mongoose.model('Life', lifeSchema);

module.exports = Life;