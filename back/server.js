const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

// Enable CORS for the frontend (adjust the URL if needed)
app.use(cors());
app.use(bodyparser.json());

// MongoDB URI
const url = "mongodb+srv://ariellabuson08:1ZJZBdkIZ74bNYMl@cluster0.7vpnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection handling
 const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
        // Connect to MongoDB without the unsupported options
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = client.db('Excercise_database');
        const collection = db.collection('sample_collection');

        // GET route to fetch all data
        app.get('/', async (request, response) => {
            try {
                const readAll = await collection.find().toArray();
                response.json(readAll);
            } catch (error) {
                console.log(error);
                response.status(500).send("Error fetching data");
            }
        });

        // GET route to fetch data by ID
        app.get('/record/:id', async (request, response) => {
            try {
                const id = request.params.id; // Access ID from request.params
                const readID = await collection.findOne({ _id: new ObjectId(id) });
        
                if (readID) {
                    response.json(readID);
                } else {
                    response.status(404).send("Data not found");
                }
            } catch (error) {
                console.log(error);
                response.status(500).send("Error fetching data by ID");
            }
        });

        // POST route to insert new data
        app.post('/', async (request, response) => {
            try {
                const data = request.body;
                if (data.title === "" || data.content === "") {
                    return response.status(400).send('Data is missing');
                }
                const sampleData = await collection.insertOne(data);
                response.json(sampleData);
            } catch (error) {
                console.log(error);
                response.status(500).send("Error inserting data");
            }
        });

        // PUT route to update data
        app.put('/:id', async (request, response) => {
            try {
                const data = request.body;
        
                // Check if required fields are missing
                if (data._id === "" || data.title === "" || data.content === "") {
                    return response.status(400).send("Missing data");
                }
        
                // Perform the update operation
                const updateSample = await collection.findOneAndUpdate(
                    { _id: new ObjectId(request.params.id) },
                    {
                        $set: {
                            title: data.title,
                            content: data.content
                        }
                    },
                    { returnDocument: 'after' } // Return the updated document
                );
        
                // Check if a document was actually updated
                if (!updateSample.value) {
                    response.status(404).send("Data not found for update");
                } else {
                    response.json(updateSample); // Send the updated document
                }
            } catch (error) {
                console.log(error);
                response.status(500).send("Server Error");
            }
        });

        // DELETE route to delete data by ID
        app.delete('/records/:id', async (request, response) => {
            try {
                const objectId = new ObjectId(request.params.id); // Convert _id to ObjectId
        
                // Log for debugging
                console.log("Received _id for deletion:", request.params.id);
        
                // Attempt to delete the document
                const deleteResult = await collection.deleteOne({ _id: objectId });
        
                // Check if a document was deleted
                if (deleteResult.deletedCount === 1) {
                    // Document was successfully deleted
                    response.status(200).send("Document deleted successfully.");
                } else {
                    // No document found to delete
                    response.status(404).send("Document not found.");
                }
            } catch (error) {
                console.log(error);
                response.status(500).send("Server Error");
            }
        });

    } catch (error) {
        console.log(error);
        process.exit(1); // Exit if MongoDB connection fails
    }
};

// Start the server and connect to MongoDB
app.listen(process.env.PORT || 3002, () => {
    console.log(`Listening on port: ${process.env.PORT || 3002}`);
    connectionDB();
});
