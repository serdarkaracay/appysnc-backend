const AWS = require('aws-sdk')
require('dotenv').config

const user_exists_in_UserTable = async(id) =>{
const DynamoDB = new AWS.DynamoDB.DocumentClient()

console.log(`find for user [${id}] in table [${process.env.USERS_TABLE}]`) 

const resp = await DynamoDB.get({
    TableName:process.env.USERS_TABLE,
    Key:{
        id
    }
}).promise()

expect(resp.Item).toBeTruthy()

return resp.Item

}

module.exports = {
    user_exists_in_UserTable
}