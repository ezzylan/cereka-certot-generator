declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
    image: string;
    username: string;
  }

  interface SecureSessionData {
    apiKey: string;
  }
}

export {};
