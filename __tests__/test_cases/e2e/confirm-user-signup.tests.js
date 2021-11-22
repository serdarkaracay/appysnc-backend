const given = require('../../steps/given')
const when = require('../../steps/when')
const then = require('../../steps/then')



describe('When user sign up', ()=>{
    it("The user's profile should be saved in DynamoDB", async() => {
        
        const {password, name, email} = given.a_random_user()
        
        const user = when.user_signup(password, name,email)

        const ddbUser =  await then.user_exists_in_UserTable(user.username)

       expect(ddbUser).toMatchObject({
        id:user.username,
        name,
        createdAt:expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g),
        followersCount:0,
        followingCount:0,
        tweetsCount:0,
        likesCounts:0
       })
       const [firstName, lastName] = name.split(' ')
       expect(ddbUser.screenName).toContain(firstName)
       expect(ddbUser.screenName).toContain(lastName)
    })
}) 