import axios from 'axios';

const API_BASE_URL = 'https://api.playzuno.com/api/v1';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const createUserwithOTP = async (data: any) => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error: any) {
    //console.log(error);
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    // Handle API errors
    throw error.response;
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  const tempdata = {
    "email":email,
    "otp":otp
  }
  try {
    const response = await api.post('/verifyotp', tempdata);
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error: any) {
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    // Handle API errors
    throw error.response;
  }
};

export const uploadProductFile = async (file: File) => {
  console.log("hit");
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error.response;
  }
};

export const createOrganization = async (data: any) => {
  console.log(data);
  
  try {
   const response = await api.post('/organizations', data);
   console.log(response.data);
   
   return response.data;
  } catch (error: any) {
    console.log(error);
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error.response;
  }
};

// {
//   "name":"Praveencompany",
//   "userRole":"manager",
//   "email":"praveenriasi@gmail.com",
//   "mobileNumber":"7708958214",
//   "orgName":"123",
//   "businessType":"resaurent",
//   "singleBranch":"True",
//   "noOfLocations":10,
//   "branchAddress":"chennai",
//   "gstNo":"1234"
// }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg2NjE2OTQsInVzZXIiOnsiaWQiOiI2N2EwOGQ5ZjNjODYxMzBkODRkNTU0N2QiLCJ1c2VybmFtZSI6InByYXZlZW4iLCJmdWxsTmFtZSI6InByYXZlZW4iLCJlbWFpbCI6InByYXZlZW5pcmFzQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijc3MDg5NTgyMTQiLCJvdHBWZXJpZmllZCI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDItMDNUMDk6MzQ6MjMuNTA1WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDItMDNUMDk6MzQ6MjMuNTA1WiIsIm1lbWJlcnNoaXAiOltdfX0.XlhA2L7a8IwF1eVAoByqVJBkLUnUywXlIjT7jrK10H8