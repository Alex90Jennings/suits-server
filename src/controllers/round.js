import Round from '../domain/round.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createRound = async (req, res) => {
    const tableId = Number(req.params.id)
    const roundToCreate = await Round.fromJSON(req.body, tableId)

    const createdRoundState = await roundToCreate.save()

    return sendDataResponse(res, 200, {...createdRoundState.toJSON()})
}

export const getRoundById = async (req, res) => {
    const roundToFindId = Number(req.params.id)

    const foundRound = await Round.findById(roundToFindId)

    if(!foundRound) return sendMessageResponse(res, 500, 'unable to find user')

    return sendDataResponse(res, 200, { foundRound })
}

export const updateRoundById = async (req, res) => {
    const roundToFindId = Number(req.params.id)
    const {numberOfCards: numberOfCards, currentTrick: currentTrick, trumps: trumps} = req.body

    const roundToUpdate = await Round.findById(roundToFindId)


    if (!roundToUpdate) {
        return sendMessageResponse(res, 400, { message: 'Round does not exist' })
    }

    roundToUpdate.numberCards = numberOfCards
    roundToUpdate.currentTrick = currentTrick
    roundToUpdate.trumps = trumps

    const updatedRound = await roundToUpdate.update()

    return sendDataResponse(res, 200,{round: {...updatedRound, currentTrick: currentTrick, trumps: trumps}})
}