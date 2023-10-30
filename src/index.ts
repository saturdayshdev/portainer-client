import axios, { Axios } from 'axios'
import { jwtDecode } from 'jwt-decode'

class PortainerClient {
  private readonly baseUrl: string
  private readonly username: string
  private readonly password: string
  private readonly axios: Axios
  private token: Token

  constructor(args: InitArgs) {
    this.baseUrl = `${args.baseUrl}/api`
    this.username = args.username
    this.password = args.password
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async authenticate(): Promise<void> {
    const { data } = await this.axios.post<PortainerToken>('/auth', {
      username: this.username,
      password: this.password,
    })

    this.token = {
      jwt: data.jwt,
      exp: jwtDecode(data.jwt).exp,
    }
  }

  async reAuthenticate(): Promise<void> {
    if (Date.now() > this.token.exp * 1000) {
      await this.authenticate()
    }
  }

  private async createStandaloneStack(
    args: CreateStandaloneStackArgs,
  ): Promise<PortainerStack> {
    await this.reAuthenticate()

    const { data } = await this.axios.post<PortainerStack>(
      `/stacks/create/standalone/string?endpointId=${args.endpointId}`,
      {
        ...args.stackConfig,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token.jwt}`,
        },
      },
    )

    return data
  }

  private async createSwarmStack(
    args: CreateSwarmStackArgs,
  ): Promise<PortainerStack> {
    await this.reAuthenticate()

    const { data } = await this.axios.post<PortainerStack>(
      `/stacks/create/swarm/string?endpointId=${args.endpointId}`,
      {
        ...args.stackConfig,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token.jwt}`,
        },
      },
    )

    return data
  }

  private async getStacks(): Promise<PortainerStack[]> {
    await this.reAuthenticate()

    const { data } = await this.axios.get<PortainerStack[]>('/stacks', {
      headers: {
        Authorization: `Bearer ${this.token.jwt}`,
      },
    })

    return data
  }

  private async getStack(args: GetStacksArgs): Promise<PortainerStack> {
    await this.reAuthenticate()

    const { data } = await this.axios.get<PortainerStack>(
      `/stacks/${args.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token.jwt}`,
        },
      },
    )

    return data
  }

  private async updateStack(args: UpdateStackArgs): Promise<PortainerStack> {
    await this.reAuthenticate()

    const { data } = await this.axios.put<PortainerStack>(
      `/stacks/${args.id}?endpointId=${args.endpointId}`,
      {
        ...args.stackConfig,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token.jwt}`,
        },
      },
    )

    return data
  }

  private async deleteStack(args: DeleteStackArgs): Promise<void> {
    await this.reAuthenticate()

    await this.axios.delete(
      `/stacks/${args.id}?endpointId=${args.endpointId}&external=${args.external}`,
      {
        headers: {
          Authorization: `Bearer ${this.token.jwt}`,
        },
      },
    )
  }

  public stacks = {
    createStandalone: this.createStandaloneStack.bind(this),
    createSwarm: this.createSwarmStack.bind(this),
    getAll: this.getStacks.bind(this),
    getById: this.getStack.bind(this),
    update: this.updateStack.bind(this),
    delete: this.deleteStack.bind(this),
  }
}

export { PortainerClient }
