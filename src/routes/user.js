import { Router } from 'express'

import { createUser, getUserById, updateUserById, getAllUserByTableId } from '../controllers/user.js'
import { createPlayerStates, getPlayerStatesByUserId, updatePlayerStateById } from '../controllers/playerState.js'

const router = Router()

router.post('/', createUser)
router.post('/:id/playerStates', createPlayerStates)
router.get('/:id', getUserById)
router.get('/:id/playerStates', getPlayerStatesByUserId)
router.patch('/playerState/:id', updatePlayerStateById)
router.get('/table/:id', getAllUserByTableId)
router.patch('/:id', updateUserById)

export default router