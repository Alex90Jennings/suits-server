import User from '../domain/user.js'
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