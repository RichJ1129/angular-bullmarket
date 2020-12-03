
const express = require("express");
const User = require("../models/user");

//Grab all the users and then update their animal's happiness
function findUsersAndUpdateHappiness() {

  User.find({},
        function (error, success) {
          if(error) {
            console.log(error);
          } else {
            console.log("Found users");

            success.forEach(element => {
              let newHappiness = element.happiness;
              newHappiness -= 1;

              if (newHappiness < 0)
                newHappiness = 0;

              console.log(element.userName);
              console.log(typeof(element.userName));


              User.findOneAndUpdate(
                {userName: element.userName},
                {$set: {happiness: newHappiness}},
                function(error,success) {
                          if(error) {
                            console.log(error);
                          }
                          else {
                            console.log("happiness updated");
                          }
                       }
                )



            });
          }
        })
  }

module.exports = {
  decrementHappiness: function () {
    findUsersAndUpdateHappiness();
  }
};
