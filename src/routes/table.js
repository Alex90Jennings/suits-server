import { Router } from 'express'

import { createTable, getTableById } from '../controllers/table.js'

const router = Router()

router.post('/', createTable)
router.get('/:id', getTableById)

export default router