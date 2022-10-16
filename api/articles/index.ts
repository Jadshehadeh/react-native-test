import axios from 'axios'

const api = process.env.REACT_APP_API

export const getArticles = async (token: string, pageNumber: number) => {
      const config = {
            headers: { Authorization: `Bearer ${token}` }
      };
      const result =  await axios.get(`${api}/articles?page=${pageNumber}`, config)
      const data = result.data.response.docs
      return data
}