import { Request, Response } from 'express'
import { FormResponseServices } from '../services/formResponseService'

const createFormResponse = async (req: Request, res: Response) => {
  const { userId, formId, responseData, form_fields_data, share_status } =
    req.body
  try {
    const data = await FormResponseServices.save({
      userId,
      formId,
      responseData,
      share_status,
      form_fields_data,
    })
    res.status(201).json({ message: 'ResponseAI save successfully', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? this ep will be to show the fields and forms to the community with status share_ in true
const getFormResponsesCommunity = async (req: Request, res: Response) => {
  try {
    const data = await FormResponseServices.getAllFormCommunity()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will be to show forms and fields to the user (History)
const getFormsByUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await FormResponseServices.getFormResponseByUserId(id)
    if (!data) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will share the result to the community
const shareFormResponseToCommunityController = async (
  req: Request,
  res: Response,
) => {
  const { userId, formId, share_status } = req.body
  try {
    const data = await FormResponseServices.shareFormResponseToCommunity({
      userId,
      formId,
      share_status,
    })

    return res.status(200).json({
      message: `Form ${share_status ? 'shared' : 'unshared'} successfully`,
      data,
    })
  } catch (error: any) {
    console.error('Error sharing/unsharing form response:', error)

    if (error.message === 'Form response not found') {
      return res.status(404).json({ message: 'Form response not found' })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteByResponseId = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await FormResponseServices.deleteResponseId(id)
    if (!data) {
      return res.status(404).json({ message: 'ResponseId not found' })
    }
    res.status(200).json({ message: 'Result deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const likeFormResponse = async (req: Request, res: Response) => {
  const { userId, formResponseId } = req.body
  try {
    const like = await FormResponseServices.addLike(userId, formResponseId)
    res.status(201).json({ message: 'Liked successfully', like })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const unlikeFormResponse = async (req: Request, res: Response) => {
  const { userId, formResponseId } = req.body
  try {
    const like = await FormResponseServices.removeLike(userId, formResponseId)
    res.status(200).json({ message: 'Unliked successfully', like })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const saveFormResponse = async (req: Request, res: Response) => {
  const { userId, formResponseId } = req.body
  try {
    const save = await FormResponseServices.saveFormResponse(
      userId,
      formResponseId,
    )
    res.status(201).json({ message: 'Saved successfully', save })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const getFormSavedResponsesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const saves = await FormResponseServices.getFormSavedResponsesByUser(userId)
    res.status(200).json(saves)
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

const unsaveFormResponse = async (req: Request, res: Response) => {
  const { userId, formResponseId } = req.body
  try {
    const save = await FormResponseServices.unsaveFormResponse(
      userId,
      formResponseId,
    )
    res.status(200).json({ message: 'Unsaved successfully', save })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export const formResponseController = {
  createFormResponse,
  getFormsByUser,
  shareFormResponseToCommunityController,
  getFormResponsesCommunity,
  deleteByResponseId,
  likeFormResponse,
  unlikeFormResponse,
  saveFormResponse,
  unsaveFormResponse,
  getFormSavedResponsesByUser
}
