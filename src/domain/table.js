import dbClient from '../utils/dbClient.js'

export default class Table {
    static fromDb(table) { return new Table( table.id, table.users, table.host, table.isInGame ) }

    static async fromJSON(json) {
        const { Users } = json

        return new Table ( null, Users, Users, false )
    }

    constructor( id, Users, host, isInGame ) {
        this.id = id,
        this.Users = Users
        this.host = host
        this.isInGame = isInGame
    }

    toJSON() {
        return {
            table: {
                id: this.id,
                Users: this.Users,
                host: this.host,
                isInGame: this.isInGame
            }
        }
    }

    async save() {
         const createdTable = await dbClient.table.create({
            data: { 
                users: {
                    connect: { id: this.Users[0].id }
                },
                host: {
                    connect: { id: this.Users[0].id }
                },
                isInGame: this.isInGame
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
