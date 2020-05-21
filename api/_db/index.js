import faunadb, { query as q } from 'faunadb'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_ID,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
})

const characters = async () => {
  const { data: documents } = await client.query(
    q.Map(q.Paginate(q.Match(q.Index('all_characters'))), (ref) => q.Get(ref))
  )

  return documents.map(({ ref, data }) => ({
    id: ref.id,
    ...data,
  }))
}

const character = async (_, { input: { id } }) => {
  try {
    const document = await client.query(
      q.Get(q.Match(q.Index('character'), id))
    )

    return {
      id: document.ref.id,
      ...document.data,
    }
  } catch (error) {
    return null
  }
}

const createCharacter = async (_, { input: { username } }) => {
  const document = await client.query(
    q.Create(q.Collection('characters'), { data: { username } })
  )

  return {
    id: document.ref.id,
    ...document.data,
  }
}

const updateCharacter = async (_, { input: characterInput }) => {
  const { id, ...character } = characterInput

  const document = await client.query(
    q.Update(q.Ref(q.Collection('characters'), id), {
      data: character,
    })
  )

  return {
    id: document.ref.id,
    ...document.data,
  }
}

const uploadImage = async (_, { input: { image } }) => {
  const { createReadStream } = await image
  const stream = createReadStream()
  const { secure_url } = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
      err ? reject(err) : resolve(result)
    })

    stream.pipe(uploadStream)
  })

  return { url: secure_url }
}

export { characters, character, createCharacter, updateCharacter, uploadImage }
