import { Router } from 'express'
import { deleteFile, uploadArray } from '../../controllers/uploadController'
import { upload } from '../../middlewares/multerConfig'

const fileRoutes = Router()

fileRoutes.post('/upload', upload.array('files', 5), uploadArray)
fileRoutes.delete('/upload/:filename', deleteFile)

export { fileRoutes }
