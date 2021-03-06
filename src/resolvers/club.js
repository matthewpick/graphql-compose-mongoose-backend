const { composeWithMongoose } = require( 'graphql-compose-mongoose/node8')
const club = require('../model/club')
const user = require('./user')


const ClubTC = composeWithMongoose(club.Club)

ClubTC.addRelation('members', {
  resolver: () => user.UserTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.memberIds
  },
  projection: { memberIds: true }
})

ClubTC.addRelation('admins', {
  resolver: () => user.UserTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.adminIds
  },
  projection: { adminIds: true }
})

ClubTC.addResolver({
  name: 'findManyByMemberUserId',
  type: [ClubTC],
  args: { userId: 'MongoID!' },
  resolve: async ({ source, args, context, info }) => {
    return await club.Club.find({ memberIds: { $in: [args.userId] } })
  }
})

ClubTC.addResolver({
  name: 'findManyByAdminUserId',
  type: [ClubTC],
  args: { userId: 'MongoID!' },
  resolve: async ({ source, args, context, info }) => {
    return await club.Club.find({ adminIds: { $in: [args.userId] } })
  }
})

const ClubQueryFields = {
  clubById: ClubTC.getResolver('findById'),
  clubByIds: ClubTC.getResolver('findByIds'),
  clubOne: ClubTC.getResolver('findOne'),
  clubMany: ClubTC.getResolver('findMany'),
  clubManyByAdminUserId: ClubTC.getResolver('findManyByAdminUserId'),
  clubManyByMemberUserId: ClubTC.getResolver('findManyByMemberUserId'),
  clubCount: ClubTC.getResolver('count'),
  clubConnection: ClubTC.getResolver('connection'),
  clubPagination: ClubTC.getResolver('pagination'),
}

const ClubMutationFields = {
  clubCreateOne: ClubTC.getResolver('createOne'),
  clubCreateMany: ClubTC.getResolver('createMany'),
  clubUpdateById: ClubTC.getResolver('updateById'),
  clubUpdateOne: ClubTC.getResolver('updateOne'),
  clubUpdateMany: ClubTC.getResolver('updateMany'),
  clubRemoveById: ClubTC.getResolver('removeById'),
  clubRemoveOne: ClubTC.getResolver('removeOne'),
  clubRemoveMany: ClubTC.getResolver('removeMany'),
}

module.exports.ClubTC = ClubTC
module.exports.ClubQueryFields = ClubQueryFields
module.exports.ClubMutationFields = ClubMutationFields
