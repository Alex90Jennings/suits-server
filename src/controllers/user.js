import User from '../domain/user.js'
import Table from '../domain/table.js'
import PlayerState from '../domain/playerState.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createUser = async (req, res) => {
    const userToCreate = await User.fromJSON(req.body)

    const createdUser = await userToCreate.save()

    return sendDataResponse(res, 200, {...createdUser.toJSON()})
}

export const getUserById = async (req, res) => {
    const userToFindId = Number(req.params.id)

    const foundUser = await User.findById(userToFindId)

    if(!foundUser) return sendMessageResponse(res, 500, 'unable to find user')

    return sendDataResponse(res, 200, { foundUser })
}

export const getAllUserByTableId = async (req, res) => {
    const tableId = Number(req.params.id)

    const foundUsers = await User.findManyByTable(tableId)

    if(!foundUsers) return sendMessageResponse(res, 500, 'unable to find users')

    return sendDataResponse(res, 200, { foundUsers })
}

export const updateUserById = async (req, res) => {
    const userToFindId = Number(req.params.id)
    let {tableId: tableId, isHost: isHost, playerStateId: playerStateId} = req.body
    tableId = Number(tableId)
    playerStateId = Number(playerStateId)

    const userToUpdate = await User.findById(userToFindId)
    const foundTable = await Table.findById(tableId)

    if(playerStateId) {
        const foundPlayerState = await PlayerState.findById(playerStateId)
        if (!foundPlayerState) {
            return sendMessageResponse(res, 400, { message: 'Player state does not exist' })
        }
    }

    if (!userToUpdate) {
        return sendMessageResponse(res, 400, { message: 'User does not exist' })
    }

    if (!foundTable) {
        return sendMessageResponse(res, 400, { message: 'Table does not exist' })
    }

    if (foundTable.isInGame === true) {
        return sendMessageResponse(res, 400, { message: 'Game has already started' })
    }

    if (foundTable.users.length > 5 ) {
        return sendMessageResponse(res, 400, { message: 'Lobby is full' })
    }

    userToUpdate.tableId = tableId
    const updatedUser = await userToUpdate.update()

    return sendDataResponse(res, 200,{user: {...updatedUser, tableId: tableId, isHost: isHost, playerStateId: playerStateId}})
}