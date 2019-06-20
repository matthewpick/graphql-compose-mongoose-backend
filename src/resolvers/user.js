const { composeWithMongoose } = require( 'graphql-compose-mongoose/node8')

// NOTE: We can't do this yet because ClubTC is not defined yet
// const { ClubTC } = require('./club')

const { User } = require('../model/user')

const UserTC = composeWithMongoose(User)


// TODO: Due to Circular dependency... ClubTC is not defined yet (so we have to require() it within the function call)

UserTC.addRelation('clubs', {
  resolver: () => require('./club').ClubTC.getResolver('findManyByMemberUserId'),
  prepareArgs: {
    userId: source => source._id
  },
  projection: { _id: true }
})

const UserQueryFields = {
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
}

const UserMutationFields = {
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
}

module.exports = {
  UserTC,
  UserQueryFields,
  UserMutationFields,
}
