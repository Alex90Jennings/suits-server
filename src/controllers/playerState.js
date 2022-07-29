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