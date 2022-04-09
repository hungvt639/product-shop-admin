import axios, { AxiosInstance } from "axios";
import http from "http";
import https from "https";
import _env from "../_env";

const baseURL = `${_env.BASE_URL}/`;
type Header = {
    Accept: string;
    "Content-Type": string;
    Authorization?: string;
};

function config(baseAPI: string, token: string, contentType: string) {
    const instance = axios.create({
        baseURL: baseAPI,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
    });
    let header: Header = {
        Accept: "*/*",
        "Content-Type": contentType,
    };
    if (token) {
        header.Authorization = token;
    }
    instance.interceptors.request.use(
        function (config) {
            config.headers = header;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response) {
            try {
                if (response.status < 200 || response.status > 300)
                    return Promise.reject(response);
                return response;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    return instance;
}

export default function AxiosAPI(
    hasToken = false,
    contentType = "application/json"
): AxiosInstance {
    const token = hasToken ? `Bearer ${localStorage.getItem("token")}` : "";
    return config(baseURL, token, contentType);
}
