import { Router } from 'express'

import { createUser, getUserById, updateById, getAllUserByTableId } from '../controllers/user.js'
import { createPlayerStates, getPlayerStatesByUserId } from '../controllers/playerState.js'

const router = Router()

router.post('/', createUser)
router.post('/:id/playerStates', createPlayerStates)
router.get('/:id', getUserById)
router.get('/:id/playerStates', getPlayerStatesByUserId)
router.get('/table/:id', getAllUserByTableId)
router.patch('/:id', updateById)

export default router