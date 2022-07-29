import { Router } from 'express'

import { createUser, getUserById, updateById, getAllUserByTableId } from '../controllers/user.js'
import { createPlayerState, getPlayerStateByUserId } from '../controllers/playerState.js'

const router = Router()

router.post('/', createUser)
router.post('/:id/playerState', createPlayerState)
router.get('/:id', getUserById)
router.get('/:id/playerState', getPlayerStateByUserId)
router.get('/table/:id', getAllUserByTableId)
router.patch('/:id', updateById)

export default router