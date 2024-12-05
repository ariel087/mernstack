// middleware/deleteRecord.js

import { MongoClient, ObjectId } from 'mongodb';

export const deleteRecord = async (req, res, next) => {
    const { id } = req.params;  // Get the ID from URL params

    const url = "mongodb+srv://ariellabuson08:1ZJZBdkIZ74bNYMl@cluster0.7vpnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB database
        await client.connect();
        const db = client.db('Excercise_database');
        const collection = db.collection('sample_collection');

        // Attempt to delete the document by its _id
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Successfully deleted the record
        return res.status(200).json({ message: 'Record deleted successfully' });

    } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).send("Error deleting record");
    } finally {
        // Close the database connection
        await client.close();
    }
};
