import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(baseUrl: string): AxiosInstance {
    const instance = axios.create({
        baseURL: baseUrl,
    });

    return instance;
}
