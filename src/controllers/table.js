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

    if(!foundTable) return sendMessageResponse(res, 500, 'unable to find table')

    return sendDataResponse(res, 200, { foundTable })
}

export const updateTableById = async (req, res) => {
    const tableToFindId = Number(req.params.id)
    const {isInGame: isInGame} = req.body

    const tableToUpdate = await Table.findById(tableToFindId)

    if(!tableToUpdate) return sendMessageResponse(res, 500, 'unable to find table')

    tableToUpdate.isInGame = isInGame
    const updatedTable = await tableToUpdate.update()

    return sendDataResponse(res, 200,{table: { ...updatedTable, isInGame: isInGame }})
}