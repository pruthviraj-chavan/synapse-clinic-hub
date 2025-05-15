
import { MongoClient, ServerApiVersion } from 'mongodb';

// Create a MongoDB client
// NOTE: In production, you should use environment variables for this
const uri = "mongodb+srv://pruthvirajchavan2002:<password>@test1.cziqhgy.mongodb.net/?retryWrites=true&w=majority&appName=test1";

// Replace <password> with your actual password when testing
// For security reasons, don't hardcode passwords in your code

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!client) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db("synapse-clinic");
    console.log("Successfully connected to MongoDB!");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// Helper functions for user authentication
export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase();
  return db.collection('users').findOne({ email });
}

export async function createUser(userData: { name: string, email: string, password: string, role: string }) {
  const { db } = await connectToDatabase();
  return db.collection('users').insertOne(userData);
}
