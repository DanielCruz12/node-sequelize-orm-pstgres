import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'

const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID as string
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY as string
const aws_region = process.env.AWS_REGION as string
const s3_bucket_name = process.env.S3_BUCKET_NAME as string

const s3 = new S3Client({
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
  region: aws_region,
})

export const uploadSingle = (req: Request, res: Response) => {
  res.json({ message: 'Single file upload success', file: req.file })
}

export const uploadArray = async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files)) {
    return res.status(400).json({ message: 'No files were uploaded.' })
  }

  try {
    const uploadedFiles = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        const params: PutObjectCommandInput = {
          Bucket: s3_bucket_name,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        }

        const command = new PutObjectCommand(params)
        await s3.send(command)

        return {
          fileName: file.originalname,
          s3Location: `https://${s3_bucket_name}.s3.${aws_region}.amazonaws.com/${file.originalname}`,
        }
      }),
    )

    res.json({ message: 'Multiple file upload success', files: uploadedFiles })
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error })
  }
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
/* 
function saveImage(file: any) {
  const newPath = `uploads/${file.originalname}`
  fs.renameSync(file.path, newPath)
  return newPath
} */
