import dbClient from '../utils/dbClient.js'

export default class Table {
    static fromDb(table) { return new Table( table.id, table.rounds, table.users, table.isInGame, table.playerStates ) }

    static async fromJSON(json) {
        const { users } = json

        return new Table ( null, undefined, users, false, undefined )
    }

    constructor( id, rounds, users, isInGame, playerStates ) {
        this.id = id,
        this.rounds = rounds
        this.users = users
        this.isInGame = isInGame
        this.playerStates = playerStates
    }

    toJSON() {
        return {
            table: {
                id: this.id,
                rounds: this.rounds,
                users: this.users,
                isInGame: this.isInGame,
                playerStates: this.playerStates
            }
        }
    }

    async save() {
         const createdTable = await dbClient.table.create({
            data: { 
                rounds: this.rounds,
                users: {
                    connect: { id: this.users[0].id },
                },
                isInGame: this.isInGame,
                playerStates: this.playerStates
            },
            include: { users: {
                playerStates: true 
            },
        },
        })

        return Table.fromDb(createdTable)
    }

    static async findById(id) {
        return Table._findByUnique('id', id)
    }

    static async _findByUnique(key, value) {
        const foundTable = await dbClient.table.findUnique({
        where: { [key]: value }
        })

        if (foundTable) {
        return Table.fromDb(foundTable)
        }

        return null
    }

    async update() {
        const updatedTable = await dbClient.table.update({
          where: {
            id: Number(this.id)
          },
          data: {
            isInGame: this.isInGame,
          }
        })
        return Table.fromDb(updatedTable)
      }
}
