declare class PortainerClient {
    private readonly baseUrl;
    private readonly username;
    private readonly password;
    private readonly axios;
    private token;
    constructor(args: InitArgs);
    authenticate(): Promise<void>;
    reAuthenticate(): Promise<void>;
    private createStandaloneStack;
    private createSwarmStack;
    private getStacks;
    private getStack;
    private updateStack;
    private deleteStack;
    stacks: {
        createStandalone: any;
        createSwarm: any;
        getAll: any;
        getById: any;
        update: any;
        delete: any;
    };
}
export { PortainerClient };
