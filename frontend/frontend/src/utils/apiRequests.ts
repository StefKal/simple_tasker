type ApiRequestConfig = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    data?: Record<string, any> | null;
    queryParams?: Record<string, any> | null;
    token?: string | null;
};

export const makeApiRequest = async ({
    method, 
    url, 
    data = null, 
    queryParams = null,
    token = null
  }: ApiRequestConfig): Promise<Response> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    // Add the Authorization header only if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let queryString = '';
    if (queryParams) {
      queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
    }
  
    const requestUrl = queryString ? `${url}?${queryString}` : url;
    const requestOptions: RequestInit = {
      method: method,
      headers: headers
    };
  
    if (data && method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }
    try {
      return await fetch(requestUrl, requestOptions);
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
