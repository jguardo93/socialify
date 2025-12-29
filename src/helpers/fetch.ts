async function http<T>(path: string, config: RequestInit): Promise<T> {

    path = "http://50.17.90.199:443/" + path; //replace for config files

    const request = new Request(path, config);
    const response = await fetch(request);

    if(!response.ok) {
        throw new Error(`code:${response.text} - message:${response.statusText}`);
    }

    // may error if there is no body, return empty array
    return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
    const init = {method: 'get', ...config}
    return await http<T>(path, init)
}

export async function post<T, U>(path: string, body: T, config : RequestInit = configJson): Promise<U> {
    const init = {method: 'post', body: JSON.stringify(body), ...config}
    return await http<U>(path, init)
}

export async function put<T, U>(path: string, body: T, config: RequestInit = configJson ): Promise<U> {
    const init = {method: 'put', body: JSON.stringify(body), ...config}
    return await http<U>(path, init)
}

export default {
    http,
    get,
    post,
    put
}

let configJson ={
    headers: {
        'Content-Type': 'application/json'
    }
}
