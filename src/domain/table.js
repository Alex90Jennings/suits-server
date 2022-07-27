import dbClient from '../utils/dbClient.js'

export default class Table {
    static fromDb(table) { return new Table( table.id, table.users, table.isInGame ) }

    static async fromJSON(json) {
        const { Users } = json

        return new Table ( null, Users, false )
    }

    constructor( id, Users, isInGame ) {
        this.id = id,
        this.Users = Users
        this.isInGame = isInGame
    }

    toJSON() {
        return {
            table: {
                id: this.id,
                Users: this.Users,
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
                isInGame: this.isInGame
            },
            include: { users: true },
        })

        return Table.fromDb(createdTable)
    }

    static async findById(id) {
        return User._findByUnique('id', id)
    }

    static async _findByUnique(key, value) {
        const foundTable = await dbClient.table.findUnique({
        where: { [key]: value }
        })

        if (foundTable) {
        return User.fromDb(foundTable)
        }

        return null
    }
}
