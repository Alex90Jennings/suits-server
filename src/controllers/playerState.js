import PlayerState from '../domain/playerState.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createPlayerStates = async (req, res) => {
    const userId = Number(req.params.id)
    const playerStateToCreate = await PlayerState.fromJSON(req.body, userId)

    const createdPlayerState = await playerStateToCreate.save()

    return sendDataResponse(res, 200, {...createdPlayerState.toJSON()})
}

export const getPlayerStatesByUserId = async (req, res) => {
    const userToFindId = Number(req.params.id)

    const foundPlayerStates = await PlayerState.findManyByUser(userToFindId)

    if(!foundPlayerStates) return sendMessageResponse(res, 500, 'unable to find user')

    return sendDataResponse(res, 200, { foundPlayerStates })
}

export const updatePlayerStateById = async (req, res) => {
    const playerStateToUpdateId = Number(req.params.id)
    const {score: score, bet: bet, hand: hand, playedCard: playedCard, playsNext: playsNext, handsWon: handsWon} = req.body

    const playerStateToUpdate = await PlayerState.findById(playerStateToUpdateId)

    if (!playerStateToUpdate) {
        return sendMessageResponse(res, 400, { message: 'Player state does not exist' })
    }

    playerStateToUpdate.score = score
    playerStateToUpdate.bet = bet
    playerStateToUpdate.hand = hand
    playerStateToUpdate.playedCard = playedCard
    playerStateToUpdate.playsNext = playsNext
    playerStateToUpdate.handsWon = handsWon

    const updatedPlayerState = await playerStateToUpdate.update()

    return sendDataResponse(res, 200,{playerState: {...updatedPlayerState, score: score, bet: bet, hand: hand, playedCard: playedCard, playsNext: playsNext, handsWon: handsWon}})
}