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