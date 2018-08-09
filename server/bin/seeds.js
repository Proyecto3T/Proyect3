require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Match = require('../models/Match');

const dburl = process.env.DBURL;
mongoose.connect(dburl).then(() => console.log(`Connected to db: ${dburl}`));


User.collection.drop()

User.create([
    {
      username: 'Valenba',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"valenba@valenba",
      wonMatches:10,
      lostMatches:4,
      statisticsAverage:{
        drive: [8,8,9,3,4],
        backhand: [8,5,10,6,4],
        serve: [2,4,9,3,6],
        volley: [8,4,9,3,1],
        resistance: [8,8,10,3,3]
      }
    },
    {
      username: 'Nico',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"niko@niko",
      wonMatches:1,
      lostMatches:9,
      statisticsAverage:{
        drive: [8,4,9,10,4],
        backhand: [8,8,8,6,4],
        serve: [7,5,9,3,7],
        volley: [8,6,9,3,5],
        resistance: [8,8,10,7,7]
      }
    },
    {
      username: 'Giorgio',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"valenba@giorgetto",
      wonMatches:6,
      lostMatches:4,
      statisticsAverage:{
        drive: [8,8,9,3,4],
        backhand: [8,5,10,6,4],
        serve: [1],
        volley: [10],
        resistance: [8,8,10,3,3]
      }
    },
    {
      username: 'PapuArza',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"papuarza@papuarza",
      wonMatches:10,
      lostMatches:0,
      statisticsAverage:{
        drive: [8,8,9,8,9],
        backhand: [8,5,10,6,9],
        serve: [7,8,9,3,9],
        volley: [8,7,9,8,10],
        resistance: [8,8,10,9,9]
      }
    },
    {
      username: 'Kike',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"kike@kike",
      wonMatches:0,
      lostMatches:10,
      statisticsAverage:{
        drive: [10,10,10,10,10],
        backhand: [4,5,10,6,5],
        serve: [7,4,5,3,5],
        volley: [4,7,5,4,10],
        resistance: [4,4,10,5,5]
      }
    },
    {
      username: 'Diego',
      password: "$2b$10$FjNK9e0dW.vSM7ub2cWyvOEa9a/SOanJtKCcQfMgcxIwgveoRMBey",
      email:"diego@diego",
      wonMatches:10,
      lostMatches:4,
      statisticsAverage:{
        drive: [0,0,9,3,4],
        backhand: [0,5,10,6,4],
        serve: [2,4,9,3,6],
        volley: [0,4,9,3,1],
        resistance: [0,0,10,3,3]
      }
    }
])
.then( () => {
    console.log("Users created")
    mongoose.disconnect()
});
// Match.create([
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-02-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   },
//   {
//     _author:  ObjectId("5b6c723763706b2e8258159d"),
//     players: [ ObjectId("5b6c723763706b2e8258159d"), ObjectId("5b6c723763706b2e8258159c")],
//     date: "2018-01-05 13:39:35.039",
//     hour: "13:39:35.039",
//     location: {
//       type: "Point",
//       coordinates: [
//         40.42731807233056,-3.697713920593287]
//     },
//     winner:  ObjectId("5b6c723763706b2e8258159d"),
//     loser: ObjectId("5b6c723763706b2e8258159c"),
//     finish: "2018-01-06 13:39:35.039",
//     closed:true,
//     ended:true,
//   }
// ])
// .then( () => {
//   console.log("Matches created")
//   mongoose.disconnect()
// });

