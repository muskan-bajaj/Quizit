export interface login{
    username: string;
    password: string;
}

export interface providerLogin{
    token: string;
    provider: string;
}

export interface register{
    email: string;
    password: string;
    name: string;
    rollno: number;
}
