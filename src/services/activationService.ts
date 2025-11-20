// 激活码验证服务

// 从环境变量或运行时配置读取API地址
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_BASE_URL) {
    return (window as any).ENV.VITE_API_BASE_URL;
  }
  return 'https://api.lovetest.com.cn';
};

const API_BASE_URL = getApiBaseUrl();

export interface ActivationResponse {
  isValid: boolean;
  message: string;
  expiresAt: string | null;
}

export class ActivationService {
  /**
   * 检测是否为开发环境
   * @returns 是否为开发环境
   */
  static isDevelopmentMode(): boolean {
    // 检测多个开发环境标识
    const isDev = 
      // Vite 开发模式
      // localhost 检测
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      // 本地IP检测
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('10.') ||
      // 开发端口检测
      window.location.port === '5173' ||
      window.location.port === '3000' ||
      window.location.port === '8080';
    
    return isDev;
  }

  /**
   * 验证激活码（带2秒超时）
   * @param code 激活码
   * @returns 验证结果
   */
  static async validateActivationCode(code: string): Promise<ActivationResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2秒超时

    try {
      const response = await fetch(`${API_BASE_URL}/api/activation/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      // 200 表示成功
      if (response.ok) {
        return {
          isValid: true,
          message: data.message,
          expiresAt: data.expiresAt,
        };
      }

      // 其他状态码表示失败
      return {
        isValid: false,
        message: data.message || '激活码验证失败',
        expiresAt: null,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      // 检查是否是超时错误
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Activation validation timeout');
        return {
          isValid: false,
          message: '请求超时，请检查网络连接或稍后重试',
          expiresAt: null,
        };
      }

      console.error('Activation validation error:', error);
      return {
        isValid: false,
        message: '无法连接到服务器，请检查网络连接',
        expiresAt: null,
      };
    }
  }

  /**
   * 从URL中提取激活码
   * @returns 激活码或null
   */
  static getActivationCodeFromURL(): string | null {
    const path = window.location.pathname;
    // 匹配 /activationCode 格式
    const match = path.match(/\/([^\/]+)$/);
    if (match && match[1]) {
      return match[1];
    }
    return "无激活码";
  }

  /**
   * 保存激活码到本地存储
   * @param code 激活码
   * @param expiresAt 过期时间
   */
  static saveActivationCode(code: string, expiresAt: string): void {
    localStorage.setItem('activationCode', code);
    localStorage.setItem('activationExpiresAt', expiresAt);
  }

  /**
   * 从本地存储获取激活码
   * @returns 激活码或null
   */
  static getSavedActivationCode(): { code: string; expiresAt: string } | null {
    const code = localStorage.getItem('activationCode');
    const expiresAt = localStorage.getItem('activationExpiresAt');
    
    if (code && expiresAt) {
      // 检查是否过期
      if (new Date(expiresAt) > new Date()) {
        return { code, expiresAt };
      } else {
        // 已过期，清除
        this.clearActivationCode();
      }
    }
    return null;
  }

  /**
   * 清除本地存储的激活码
   */
  static clearActivationCode(): void {
    localStorage.removeItem('activationCode');
    localStorage.removeItem('activationExpiresAt');
  }
}
