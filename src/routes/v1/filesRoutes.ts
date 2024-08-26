import { Router } from 'express'
import { deleteFile, uploadArray } from '../../controllers/uploadController'
import { uploadMulter } from '../../middlewares/multerConfig'

const fileRoutes = Router()

fileRoutes.post('/upload', uploadMulter.array('files', 5), uploadArray)
fileRoutes.delete('/upload/:filename', deleteFile)

export {fileRoutes}