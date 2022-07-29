import dbClient from '../utils/dbClient.js'

export default class User {
    static fromDb(user) { return new User( user.id, user.username, user.isHost, user.score, user.tableId, user.playerStates ) }

    static async fromJSON(json) {
        const { username } = json

        return new User ( null, username, false, 0, undefined, undefined )
    }


    constructor( id, username, isHost, score, tableId, playerStates ) {
        this.id = id,
        this.username = username
        this.isHost = isHost
        this.score = score
        this.tableId = tableId
        this.playerStates = playerStates
    }

    toJSON() {
        return {
            user: {
                id: this.id,
                username: this.username,
                isHost: this.isHost,
                score: this.score,
                hostTable: this.hostTable,
                tableId: this.tableId,
                playerStateId: this.playerStateId
            }
        }
    }

    async save() {
         const createdUser = await dbClient.user.create({
            data: { 
                username: this.username,
                isHost: this.isHost,
                score: this.score,
                hostTable: this.hostTable,
                tableId: this.tableId,
                playerStates: this.playerStates
            }
        })

        return User.fromDb(createdUser)
    }

    static async findById(id) {
        return User._findByUnique('id', id)
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: { [key]: value }
    })

    if (foundUser) {
      return User.fromDb(foundUser)
    }
    return null
  }

  static async findManyByTable(tableId) {
    return User._findMany({ key: 'tableId', value: tableId })
  }

  static async _findMany({ key, value }) {
    const query = {
      where: { [key]: value },
    }

    const foundUsers = await dbClient.user.findMany(query)

    return foundUsers.map((user) => User.fromDb(user))
  }

  async update() {
    const updatedUser = await dbClient.user.update({
      where: {
        id: Number(this.id)
      },
      data: {
        username: this.username,
        isHost: this.isHost,
        score: this.score,
        hostTable: this.hostTable,
        tableId: this.tableId,
        playerStates: this.playerStates
      }
    })
    return User.fromDb(updatedUser)
  }
}
