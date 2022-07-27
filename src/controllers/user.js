import User from '../domain/user.js'
import Table from '../domain/table.js'
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

export const updateById = async (req, res) => {
    const userToFindId = Number(req.params.id)
    let {tableId: tableId} = req.body
    tableId = Number(tableId)
    console.log(tableId)

    const userToUpdate = await User.findById(userToFindId)
    const foundTable = await Table.findById(tableId)


    if (!userToUpdate) {
        return sendDataResponse(res, 400, { message: 'User does not exist' })
    }

    if (!foundTable) {
        return sendDataResponse(res, 400, { message: 'Table does not exist' })
    }

    userToUpdate.tableId = tableId
    console.log(foundTable)
    const updatedUser = await userToUpdate.update()

    return sendDataResponse(res, 200,{user: {...updatedUser, tableId: tableId}})
}