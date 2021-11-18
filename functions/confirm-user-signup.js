
const DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient()
const Chance = require('chance')
const chance = new Chance()

const { USERS_TABLE } = process.env

module.exports.handler = async (event)=>{

    const name = event.request.usernameAttributes['name']
    const suffix = chance.string({length:8, alpha:true,casing:'upper', numeric:true})
    const screenName = `${name.replace(/[^a-zA-Z0-9]/g, "")}${suffix}`
    const user = {
    id: event.userName,
    name,
    screenName,
    createdAt: new Date.toJSON(),
    followersCount:0,
    followingCount:0,
    tweetsCount:0,
    likesCounts:0
}

    if (event.triggerSource === 'PostConfirmation_ConfirmSigUp') {
        await DocumentClient.put({
            TableName:USERS_TABLE,
            Item:user,
            ConditionExpression:'attribute_not_exists(id)'
        }).promise()
        return event;
    } else
    return event
}