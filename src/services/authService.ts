import axios from "axios";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  private static instance: AuthService;
  //   private baseURL = 'http://localhost:3001/api/auth';
  private baseURL = "http://192.168.2.3:3001/api/auth";

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseURL}/login`,
        credentials
      );

      // 存储 token
      localStorage.setItem("token", response.data.token);
      // 存储用户信息
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error || "登录失败");
      }
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default AuthService;
