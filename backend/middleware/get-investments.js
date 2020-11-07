const express = require("express");
const Stock = require("../models/investment");
const router = express.Router();
const axios = require('axios');
const { db } = require("../models/investment");


userID="24315";
//User ID, Investment Name, Investment Symbol, Purchase Price, Shares
const initialInvestment = [
    [userID,'Dollars','USD',1,10000]
  ]; 

//Function to retrieve userID from users collection _id variable

function getUserID(){
  userID="asb2324ldadk3"
  //userID=db.users.find({"email":"mathwict@oregonstate.edu"},{"_id":1});
  console.log("get-investments middleware userID: ");
  console.log(userID);
};


//Function to set an initial investment of USD10000

//Function to add a 

/*
  function apiInvestmentCall(current_investment) {
    const investment = new Investment({
      userID: current_investment[0],
      name: current_investment[1],
      symbol: current_investment[2],
      purchasePrice: current_investment[3],
      shares: current_investment[4]
    });
  
    Investment.count({symbol: current_investment[2],}, function (err, count) {
      if (count > 0){
        Investment.findOneAndUpdate(
          {symbol: current_investment[2]},
          {$set:{userID: current_investment[0], name: current_investment[1], symbol: current_investment[2], purchasePrice: current_investment[3], shares: current_investment[4]}},
          function (error, success) {
            if(error) {
              console.log(error);
            } else {
              console.log(current_investment[2]);
            }
          }
        );
      } else {
        investment.save();
      }
    })
  }


  const interval = 1000;

  module.exports = {
    getInvestments: function () {
      for (let i = 0; i <= investments.length - 1; i++) {
        setTimeout(function (i) {apiInvestmentCall(investments[i])}, interval * i, i);
      }
    }
  };

  */