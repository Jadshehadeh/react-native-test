import axios from 'axios'

const api = process.env.REACT_APP_API

export interface IData {
      username: string,
      password: string
}

export const Login = async (data: IData) => {

      const result = await axios.post(`${api}/auth/signin`, data)
      const token = result.data.accessToken
      return token
}