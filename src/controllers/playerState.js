import PlayerState from '../domain/playerState.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createPlayerState = async (req, res) => {
    const userId = Number(req.params.id)
    const playerStateToCreate = await PlayerState.fromJSON(req.body)

    const createdPlayerState = await playerStateToCreate.save()

    return sendDataResponse(res, 200, {...createdPlayerState.toJSON()})
}

export const getPlayerStateByUserId = async (req, res) => {
    const userToFindId = Number(req.params.id)

    const foundPlayerState = await PlayerState.findById(userToFindId)

    if(!foundPlayerState) return sendMessageResponse(res, 500, 'unable to find user')

    return sendDataResponse(res, 200, { foundPlayerState })
}