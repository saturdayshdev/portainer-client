interface InitArgs {
  baseUrl: string
  username: string
  password: string
}

interface Token {
  jwt: string
  exp: number
}

interface CreateStandaloneStackArgs {
  endpointId: number
  stackConfig: StandaloneStackConfig
}

interface CreateSwarmStackArgs {
  endpointId: number
  stackConfig: SwarmStackConfig
}

interface GetStacksArgs {
  id: number
}

interface UpdateStackArgs {
  id: number
  endpointId: number
  stackConfig: StackUpdateConfig
}

interface DeleteStackArgs {
  id: number
  endpointId: number
  external: boolean
}

interface StandaloneStackConfig {
  env?: {
    [key: string]: string
  }
  fromAppTemplate?: boolean
  name: string
  stackFileContent: string
  swarmID: string
  webhook?: string
}

interface StackUpdateConfig {
  env?: {
    [key: string]: string
  }
  prune: boolean
  pullImage: boolean
  rollbackTo: number
  stackFileContent: string
  webhook?: string
}

interface SwarmStackConfig {
  env?: {
    [key: string]: string
  }
  fromAppTemplate?: boolean
  name: string
  stackFileContent: string
  webhook?: string
}

interface PortainerToken {
  jwt: string
}

interface PortainerStack {
  AdditionalFiles: string[]
  AutoUpdate: {
    forcePullImage: boolean
    forceUpdate: boolean
    interval: string
    jobID: string
    webhook: string
  }
  EndpointId: number
  Entrypoint: string
  Env: {
    name: string
    value: string
  }[]
  Id: number
  Name: string
  Option: {
    prune: boolean
  }
  PreviousDeploymentInfo: {
    ConfigHash: string
    FileVersion: number
    Version: number
  }
  ResourceControl: {
    AccessLevel: number
    AdministratorsOnly: boolean
    Id: number
    Public: boolean
    ResourceId: string
    SubResourceIds: string[]
    System: boolean
    Type: number
    UserAccesses: {
      AccessLevel: number
      UserId: number
    }[]
  }
  Status: number
  SwarmId: string
  Type: number
  createdBy: string
  creationDate: string
  filesystemPath: string
  fromAppTemplate: boolean
  gitConfig: {
    authentication: {
      gitCrdentialID: number
      password: string
      username: string
    }
    configFilePath: string
    configHash: string
    referenceName: string
    tlsskipVerify: boolean
    url: string
  }
  isComposeFormat: boolean
  namespace: string
  projectPath: string
  stackFileVersion: number
  supportRelativePath: boolean
  updateDate: number
  updatedBy: string
  webhook: string
}
