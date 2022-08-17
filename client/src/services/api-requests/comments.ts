import { axiosInstance } from '../axios';

export const getCommentsById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`/api/comment/${id}`)
  return response.data
}

export const createComment = async (user: string, text: string, postId: string, responseId?: string): Promise<any> => {
  const data = {
    user,
    text,
    postId,
    responseId
  }
  const response = await axiosInstance.post('/api/comment', data)
  return response.data
}

export const removeComment = async (id: string): Promise<any> => {
  const response = await axiosInstance.delete(`/api/comment/${id}`)
  return response.data
}