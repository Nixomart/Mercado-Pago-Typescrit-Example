import {Router} from 'express'
import { getUser } from '../controllers/user.controller'
import { verifyToken } from '../middleware/auth.jwt'


const router = Router()

router.get('/getUser/:id', verifyToken,getUser)

export default router