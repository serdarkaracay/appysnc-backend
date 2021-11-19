
const chance = require('chance').Chance()

const a_random_user = () => {

const firstName = chance.first({nationality:'en'})
const lastName = chance.first({nationality:'en'})
const suffix = chance.string({length:4, pool:'abcdefghijklmnopqrstuvwxyz'})
const name =`${firstName} ${lastName} ${suffix}`
const email = `${firstName}-${lastName}-${suffix}@spectrumkod.com`
const password = chance.string({length:8})

return{
    name,
    password,
    email
}

}



module.exports = {
    a_random_user
}