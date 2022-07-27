import dbClient from '../utils/dbClient.js'

export default class User {
    static fromDb(user) { return new User( user.id, user.username, user.hostTable, user.table ) }

    static async fromJSON(json) {
        const { username } = json

        return new User ( null, username, undefined, undefined )
    }


    constructor( id, username, hostTable, table ) {
        this.id = id,
        this.username = username
        this.hostTable = hostTable
        this.table = table
    }

    toJSON() {
        return {
            user: {
                id: this.id,
                username: this.username,
                hostTable: this.hostTable,
                table: this.table
            }
        }
    }

    async save() {
         const createdUser = await dbClient.user.create({
            data: { 
                username: this.username,
                hostTable: this.hostTable,
                table: this.table,
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
    console.log(this.id)
    const updatedUser = await dbClient.user.update({
      where: {
        id: Number(this.id)
      },
      data: {
        username: this.username,
        tableId: this.tableId,
        hostId: this.hostId
      }
    })

    return User.fromDb(updatedUser)
  }
}
