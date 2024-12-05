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
const connectionDB = async () => {
    try {
        const client = await MongoClient.connect(url, {
 useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Enforce TLS connection
  tlsAllowInvalidCertificates: true,
        });

        console.log('Connected to MongoDB');

        const db = client.db('Excercise_database'); // Replace with your database name
        const collection = db.collection('sample_collection'); // Replace with your collection name

        // GET route to fetch all data
        app.get('/', async (req, res) => {
            try {
                const readAll = await collection.find().toArray();
                res.json(readAll);
            } catch (error) {
                console.log(error);
                res.status(500).send("Error fetching data");
            }
        });

        // GET route to fetch data by ID
        app.get('/record/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const readID = await collection.findOne({ _id: new ObjectId(id) });

                if (readID) {
                    res.json(readID);
                } else {
                    res.status(404).send("Data not found");
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Error fetching data by ID");
            }
        });

        // POST route to insert new data
        app.post('/', async (req, res) => {
            try {
                const data = req.body;
                if (data.title === "" || data.content === "") {
                    return res.status(400).send('Data is missing');
                }
                const sampleData = await collection.insertOne(data);
                res.json(sampleData);
            } catch (error) {
                console.log(error);
                res.status(500).send("Error inserting data");
            }
        });

        // PUT route to update data
        app.put('/:id', async (req, res) => {
            try {
                const data = req.body;

                if (data._id === "" || data.title === "" || data.content === "") {
                    return res.status(400).send("Missing data");
                }

                const updateSample = await collection.findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    {
                        $set: {
                            title: data.title,
                            content: data.content
                        }
                    },
                    { returnDocument: 'after' } // Return the updated document
                );

                if (!updateSample.value) {
                    res.status(404).send("Data not found for update");
                } else {
                    res.json(updateSample); // Send the updated document
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Server Error");
            }
        });

        // DELETE route to delete data by ID
        app.delete('/records/:id', async (req, res) => {
            try {
                const objectId = new ObjectId(req.params.id);

                // Log for debugging
                console.log("Received _id for deletion:", req.params.id);

                const deleteResult = await collection.deleteOne({ _id: objectId });

                if (deleteResult.deletedCount === 1) {
                    res.status(200).send("Document deleted successfully.");
                } else {
                    res.status(404).send("Document not found.");
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Server Error");
            }
        });

        // Start the server
        app.listen(process.env.PORT || 3002, () => {
            console.log(`Listening on port: ${process.env.PORT || 3002}`);
        });

    } catch (error) {
        console.log("MongoDB connection failed:", error);
        process.exit(1); // Exit if MongoDB connection fails
    }
};

// Start the database connection
connectionDB();
