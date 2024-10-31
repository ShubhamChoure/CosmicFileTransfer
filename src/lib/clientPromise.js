import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env")
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const clientPromise = client.connect()

export default clientPromise
