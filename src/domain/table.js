import dbClient from '../utils/dbClient.js'

export default class Table {
    static fromDb(table) { return new Table( table.id, table.rounds, table.users, table.isInGame, table.playerState ) }

    static async fromJSON(json) {
        const { users } = json

        return new Table ( null, undefined, users, false, undefined )
    }

    constructor( id, rounds, users, isInGame, playerState ) {
        this.id = id,
        this.rounds = rounds
        this.users = users
        this.isInGame = isInGame
        this.playerState = playerState
    }

    toJSON() {
        return {
            table: {
                id: this.id,
                rounds: this.rounds,
                users: this.users,
                isInGame: this.isInGame,
                playerState: this.playerState
            }
        }
    }

    async save() {
         const createdTable = await dbClient.table.create({
            data: { 
                rounds: this.rounds,
                users: {
                    connect: { id: this.users[0].id }
                },
                isInGame: this.isInGame,
                playerState: this.playerState
            },
            include: { users: true },
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
}
