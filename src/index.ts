import axios, { Axios } from 'axios'
import { jwtDecode } from 'jwt-decode'

class PortainerClient {
  private readonly baseUrl: string
  private readonly username: string
  private readonly password: string
  private readonly axios: Axios
  private token: Token

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl
    this.username = username
    this.password = password
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async authenticate(): Promise<void> {
    const { data } = await this.axios.post<PortainerToken>('/api/auth', {
      username: this.username,
      password: this.password,
    })

    this.token = {
      jwt: data.jwt,
      exp: jwtDecode(data.jwt).exp,
    }
  }

  async getStacks(): Promise<any> {
    const { data } = await this.axios.get<PortainerStack[]>('/api/stacks', {
      headers: {
        Authorization: `Bearer ${this.token.jwt}`,
      },
    })

    return data
  }
}

export { PortainerClient }
