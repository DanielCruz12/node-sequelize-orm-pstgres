import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export const uploadSingle = (req: Request, res: Response) => {
  res.json({ message: 'Single file upload success', file: req.file })
}

export const uploadArray = (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files)) {
    return res.status(400).json({ message: 'No files were uploaded.' })
  }

  const savedFiles = req.files.map(saveImage)
  res.json({ message: 'Multiple file upload success', files: savedFiles })
}

export const deleteFile = (req: Request, res: Response) => {
  const { filename } = req.params
  const filePath = path.join(__dirname, '../../uploads', filename)

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' })
    }
    res.json({ message: 'File deleted successfully' })
  })
}

function saveImage(file: any) {
  const newPath = `uploads/${file.originalname}`
  fs.renameSync(file.path, newPath)
  return newPath
}
