import dbClient from '../utils/dbClient.js'

export default class User {
    static fromDb(user) { return new User( user.id, user.username ) }

    static async fromJSON(json) {
        const { username } = json

        return new User ( null, username)
    }


    constructor( id, username ) {
        this.id = id,
        this.username = username
    }

    toJSON() {
        return {
            user: {
                id: this.id,
                username: this.username
            }
        }
    }

    async save() {
        console.log(this.username)
         const createdUser = await dbClient.user.create({
            data: { 
                username: this.username 
            }
        })

        return User.fromDb(createdUser)
    }

    static async findById(id) {
        console.log("inside findById")
        return User._findByUnique('id', id)
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: { [key]: value }
    })

    if (foundUser) {
        console.log("found user: ", foundUser)
      return User.fromDb(foundUser)
    }

    return null
  }
}
