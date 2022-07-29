import dbClient from '../utils/dbClient.js'

export default class PlayerState {
    static fromDb(playerState) { return new PlayerState( playerState.id, playerState.user, playerState.score, playerState.bet, playerState.round, playerState.hand, playerState.handsWon ) }

    static async fromJSON(json, userId) {
        const { roundId } = json

        return new PlayerState ( null, userId, 0, 0, roundId, undefined, 0 )
    }

    constructor( id, user, score, bet, round, hand, handsWon ) {
        this.id = id,
        this.user = user
        this.score = score
        this.bet = bet
        this.round = round
        this.hand = hand
        this.handsWon = handsWon
    }

    toJSON() {
        return {
            playerState: {
                id: this.id,
                user: this.user,
                score: this.score,
                bet: this.bet,
                round: this.round,
                hand: this.hand,
                handsWon: this.handsWon
            }
        }
    }

    async save() {
        const createdPlayerState = await dbClient.playerState.create({
            data: { 
                user: {
                    connect: { id: this.user }
                },
                score: this.score,
                bet: this.bet,
                round: {
                    connect: { id: this.round }
                },
                hand: this.hand,
                handsWon: this.handsWon
            },
            include: { user: true, round: true },
        })
       return PlayerState.fromDb(createdPlayerState)
    }

    static async findById(id) {
        return PlayerState._findByUnique('id', id)
    }

    static async _findByUnique(key, value) {
        const foundPlayerState = await dbClient.playerState.findUnique({
            where: { [key]: value }
        })

        console.log(foundPlayerState)

        if (foundPlayerState) {
            return PlayerState.fromDb(foundPlayerState)
        }

        return null
    }

    static async findManyByUser(userId) {
        return PlayerState._findMany({ key: 'userId', value: userId })
    }
    
    static async _findMany({ key, value }) {
        const query = {
          where: { [key]: value },
        }
    
        const foundPlayerStates = await dbClient.playerState.findMany(query)
    
        return foundPlayerStates.map((playerState) => PlayerState.fromDb(playerState))
    }
}