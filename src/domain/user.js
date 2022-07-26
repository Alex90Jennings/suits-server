import dbClient from '../utils/dbClient.js'

export default class User {
    static fromDb(user) { return new User( user.id, user.username ) }

    static async fromJson(json) {
        const { username } = json

        return new User (username)
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
        const createdUser = await dbClient.user.create({
            data: { username: this.username }
        })

        return User.fromDb(createdUser)
    }

    static async findById(id) {
        return User._findByUnique('id', id)
  }
}
