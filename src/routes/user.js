import { Router } from 'express'

import { createUser, getUserById, updateById } from '../controllers/user.js'

const router = Router()

router.post('/', createUser)
router.get('/:id', getUserById)
router.patch('/:id', updateById)

export default router