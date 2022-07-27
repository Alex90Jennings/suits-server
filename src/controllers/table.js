import Table from '../domain/table.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const createTable = async (req, res) => {
    const tableToCreate = await Table.fromJSON(req.body)

    const createdTable = await tableToCreate.save()

    return sendDataResponse(res, 200, {...createdTable.toJSON()})

}

export const getTableById = async (req, res) => {
    const tableToFindId = Number(req.params.id)

    const foundTable = await Table.findById(tableToFindId)

    if(!foundTable) return sendMessageResponse(res, 500, 'unable to find user')

    return sendDataResponse(res, 200, { foundTable })
}