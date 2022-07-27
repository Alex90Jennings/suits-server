import { Router } from 'express'

import { createUser, getUserById, updateById, getAllUserByTableId } from '../controllers/user.js'

const router = Router()

router.post('/', createUser)
router.get('/:id', getUserById)
router.get('/table/:id', getAllUserByTableId)
router.patch('/:id', updateById)

export default router