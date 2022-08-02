import { Router } from 'express'

import { createTable, getTableById, updateTableById } from '../controllers/table.js'
import { createRound, getRoundById } from '../controllers/round.js'

const router = Router()

router.post('/', createTable)
router.get('/:id', getTableById)
router.patch('/:id', updateTableById)
router.post('/:id/round', createRound)
router.get('/round/:id', getRoundById)

export default router