import 'dotenv/config'
import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
const port = Number(process.env.PORT || 3001)
const uri = process.env.MONGODB_URI
const databaseName = process.env.MONGODB_DB_NAME || 'address_book'

if (!uri) {
  console.error('MONGODB_URI is missing. Add it to .env.')
  process.exit(1)
}

const client = new MongoClient(uri)
const addresses = client.db(databaseName).collection('addresses')

app.use(express.json({ limit: '16kb' }))

app.get('/api/addresses', async (_request, response) => {
  try {
    const items = await addresses.find({}).sort({ createdAt: -1 }).toArray()
    response.json(items)
  } catch {
    response.status(503).json({ error: 'Could not load addresses from the database.' })
  }
})

app.post('/api/addresses', async (request, response) => {
  const { type, line1, line2 = '', city, region = '', postal = '', country = '' } = request.body ?? {}
  if (!['Home', 'Office'].includes(type) || !String(line1 ?? '').trim() || !String(city ?? '').trim()) {
    return response.status(400).json({ error: 'Address type, street address, and city are required.' })
  }

  const document = {
    type,
    line1: String(line1).trim(),
    line2: String(line2).trim(),
    city: String(city).trim(),
    region: String(region).trim(),
    postal: String(postal).trim(),
    country: String(country).trim(),
    createdAt: new Date(),
  }

  try {
    const existing = await addresses.findOne({ type, line1: document.line1 })
    if (existing) return response.status(200).json(existing)
    const result = await addresses.insertOne(document)
    response.status(201).json({ ...document, _id: result.insertedId })
  } catch {
    response.status(503).json({ error: 'Could not save the address to the database.' })
  }
})

app.delete('/api/addresses/:id', async (request, response) => {
  if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: 'Invalid address id.' })

  try {
    const result = await addresses.deleteOne({ _id: new ObjectId(request.params.id) })
    if (!result.deletedCount) return response.status(404).json({ error: 'Address not found.' })
    response.status(204).end()
  } catch {
    response.status(503).json({ error: 'Could not delete the address from the database.' })
  }
})

try {
  await client.connect()
  await client.db(databaseName).command({ ping: 1 })
  app.listen(port, '127.0.0.1', () => console.log(`Address API listening on http://127.0.0.1:${port}`))
} catch {
  console.error('Could not connect to MongoDB. Check the .env connection string and Atlas network access.')
  process.exit(1)
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await client.close()
    process.exit(0)
  })
}
