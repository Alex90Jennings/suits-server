import dbClient from '../utils/dbClient.js'

export default class Round {
    static fromDb(round) { return new Round( round.id, round.numberCards, round.currentTrick, round.tableId, round.playerStates, round.trumps ) }

    static async fromJSON(json, tableId) {
        const { numberCards, trumps } = json

        return new Round ( null, numberCards, undefined, tableId, undefined, trumps )
    }

    constructor( id, numberCards, currentTrick, tableId, playerStates, trumps ) {
        this.id = id,
        this.numberCards = numberCards
        this.currentTrick = currentTrick
        this.tableId = tableId
        this.playerStates = playerStates
        this.trumps = trumps
    }

    toJSON() {
        return {
            round: {
                id: this.id,
                numberCards: this.numberCards,
                currentTrick: this.currentTrick,
                tableId: this.tableId,
                playerStates: this.playerStates,
                trumps: this.trumps
            }
        }
    }

    async save() {
        const createdRound = await dbClient.round.create({
            data: { 
                currentTrick: this.currentTrick,
                numberCards: this.numberCards,
                tableId: this.tableId,
                playerStates: this.playerStates,
                trumps: this.trumps
            }
        })
       return Round.fromDb(createdRound)
    }

    static async findById(id) {
        return Round._findByUnique('id', id)
    }

    static async _findByUnique(key, value) {
        const foundRound = await dbClient.round.findUnique({
            where: { [key]: value }
        })

        console.log(foundRound)

        if (foundRound) {
            return Round.fromDb(foundRound)
        }

        return null
    }
}