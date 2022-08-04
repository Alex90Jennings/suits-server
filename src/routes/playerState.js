import { Router } from 'express'

import { getPlayerStatesById } from '../controllers/playerState.js'

const router = Router()

router.get('/:id', getPlayerStatesById)

export default router