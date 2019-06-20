require('dotenv').config()  // Get MONGO_URI from .env file
const { ApolloServer } = require('apollo-server')

const mongoose = require( 'mongoose')
const schema = require('./src/schema')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

const server = new ApolloServer({
  schema,
  context: ({req}) => {
    return {
      authorization: req.headers.authorization
    }
  },
  introspection: true,
  playground: true
})

server.listen({ port: 3001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
