
const API_URL = 'http://localhost:8080/api/v1';

export const createPost = async (post: { content: string; privacy: string; }) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(post)
  });
  return response.json();
};

export const getFeed = async () => {
  const response = await fetch(`${API_URL}/feed`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  return response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const register = async (user: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
};
