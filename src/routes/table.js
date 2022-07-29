import { Router } from 'express'

import { createTable, getTableById } from '../controllers/table.js'
import { createRound, getRoundByTableId } from '../controllers/round.js'

const router = Router()

router.post('/', createTable)
router.get('/:id', getTableById)
router.get('/:id/round', createRound)
router.get('/round/:id', getRoundByTableId)

export default router