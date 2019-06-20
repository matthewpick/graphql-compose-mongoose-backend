
const { schemaComposer } = require( 'graphql-compose')
const { UserMutationFields, UserQueryFields } = require('./resolvers/user')
const { ClubMutationFields, ClubQueryFields } = require('./resolvers/club')

schemaComposer.Query.addFields(UserQueryFields)
schemaComposer.Query.addFields(ClubQueryFields)

schemaComposer.Mutation.addFields(UserMutationFields)
schemaComposer.Mutation.addFields(ClubMutationFields)

const graphqlSchema = schemaComposer.buildSchema()

module.exports = graphqlSchema
