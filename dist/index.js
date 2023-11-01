"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortainerClient = void 0;
const axios_1 = require("axios");
const jwt_decode_1 = require("jwt-decode");
class PortainerClient {
    constructor(args) {
        this.stacks = {
            createStandalone: this.createStandaloneStack.bind(this),
            createSwarm: this.createSwarmStack.bind(this),
            getAll: this.getStacks.bind(this),
            getById: this.getStack.bind(this),
            update: this.updateStack.bind(this),
            delete: this.deleteStack.bind(this),
        };
        this.baseUrl = `${args.baseUrl}/api`;
        this.username = args.username;
        this.password = args.password;
        this.axios = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async authenticate() {
        const { data } = await this.axios.post('/auth', {
            username: this.username,
            password: this.password,
        });
        this.token = {
            jwt: data.jwt,
            exp: (0, jwt_decode_1.jwtDecode)(data.jwt).exp,
        };
    }
    async reAuthenticate() {
        if (Date.now() > this.token.exp * 1000) {
            await this.authenticate();
        }
    }
    async createStandaloneStack(args) {
        await this.reAuthenticate();
        const { data } = await this.axios.post(`/stacks/create/standalone/string?endpointId=${args.endpointId}`, Object.assign({}, args.stackConfig), {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
        return data;
    }
    async createSwarmStack(args) {
        await this.reAuthenticate();
        const { data } = await this.axios.post(`/stacks/create/swarm/string?endpointId=${args.endpointId}`, Object.assign({}, args.stackConfig), {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
        return data;
    }
    async getStacks() {
        await this.reAuthenticate();
        const { data } = await this.axios.get('/stacks', {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
        return data;
    }
    async getStack(args) {
        await this.reAuthenticate();
        const { data } = await this.axios.get(`/stacks/${args.id}`, {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
        return data;
    }
    async updateStack(args) {
        await this.reAuthenticate();
        const { data } = await this.axios.put(`/stacks/${args.id}?endpointId=${args.endpointId}`, Object.assign({}, args.stackConfig), {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
        return data;
    }
    async deleteStack(args) {
        await this.reAuthenticate();
        await this.axios.delete(`/stacks/${args.id}?endpointId=${args.endpointId}&external=${args.external}`, {
            headers: {
                Authorization: `Bearer ${this.token.jwt}`,
            },
        });
    }
}
exports.PortainerClient = PortainerClient;
