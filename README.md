In the Index.Js One is required to create a model for the candidates so at line 31 First Run the insertOne command for one time then change it back to update one in the insertOne use             
await collection1.insertOne({ candidate_id: 1, "name": "Candidate 1",  votes: 0  });
await collection1.insertOne({ candidate_id: 2, "name": "Candidate 2",  votes: 0  });
await collection1.insertOne({ candidate_id: 3, "name": "Candidate 3",  votes: 0  });

Using these once change it back to 
const candidateIdNumber = parseInt(candidate_Id);
        if (candidateIdNumber === 1) {
            await collection1.updateOne({ candidate_id: 1 }, { $inc: { votes: 1 } });
        } else if (candidateIdNumber === 2) {
            await collection1.updateOne({ candidate_id: 2 }, { $inc: { votes: 1 } });
        } else if (candidateIdNumber === 3) {
            await collection1.updateOne({ candidate_id: 3 }, { $inc: { votes: 1 } });
        }
