const express = require('express')
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Voting-System';


const disableButtonTimestamp = Date.now() + 600000; 

app.post('/vote', async (req, res) => {
    const user_ph = req.body.user_phone;
    const candidate_Id = req.body['candidate_id'];
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const ExistUser = await collection.findOne({Mobile: user_ph})
        if(ExistUser){
            res.send("You have already voted")
        }
        else {
        collection.insertOne({Mobile : user_ph, Given_Vote_Id : candidate_Id})
        const collection1 = db.collection('Candidate')
        console.log(candidate_Id)
        const candidateIdNumber = parseInt(candidate_Id);
        if (candidateIdNumber === 1) {
            await collection1.updateOne({ candidate_id: 1 }, { $inc: { votes: 1 } });
        } else if (candidateIdNumber === 2) {
            await collection1.updateOne({ candidate_id: 2 }, { $inc: { votes: 1 } });
        } else if (candidateIdNumber === 3) {
            await collection1.updateOne({ candidate_id: 3 }, { $inc: { votes: 1 } });
        }
        }
        



    }catch(e){
        console.log(`Error Occured : ${e}`)
    }
    console.log(`Phone num is ${user_ph} the candidate id voted is ${candidate_Id}`)
})

app.get('/', async function (req, res) {
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection= db.collection('Candidate')
        const Voters = await collection.find({}).toArray();
        let xVal = Voters.map (Voters => Voters.name)
        let yVal = Voters.map (Voters => Voters.votes)
        res.render('home', {disableButtonTimestamp: disableButtonTimestamp, xVal, yVal});
    }
    catch(e){
        console.log(`Error : ${e}`)
    }
        
})
app.listen(3000)
