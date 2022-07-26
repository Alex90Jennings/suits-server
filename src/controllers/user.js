import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createUser = async (req, res) => {
    const userToCreate = await User.fromJson(req.body)

    try {
        const existingUser = await User.findById(userToCreate.email)

        if (existingUser) return 'username already in use'

        const createdUser = await userToCreate.save()

        return sendDataResponse(res, 200, {...createdUser.toJson()})
    } catch (e) {
        console.e('something went wront', e.message)
        return sendMessageResponse(res, 500, 'unable to create new user')
    }
}

export const getUserById = async (req, res) => {
    const { id: id } = req.query
    const userToFindId = Number(req.params.id)

    if (id) foundUser = await User.findById(userToFindId)

    return sendDataResponse(res, 200, { user: foundUser })
}