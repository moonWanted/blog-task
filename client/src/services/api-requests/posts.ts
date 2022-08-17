import { axiosInstance } from '../axios';

export const getPosts = async (): Promise<any> => {
  const response = await axiosInstance.get('/api/post')
  return response.data
}

export const createPost = async (user: string, content: string): Promise<any> => {
  const data = {
    user,
    content
  }
  const response = await axiosInstance.post('/api/post', data)
  return response.data
}

export const removePost = async (id: string): Promise<any> => {
  const response = await axiosInstance.delete(`/api/post/${id}`)
  return response.data
}