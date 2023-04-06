export interface UserRegister {
    email: string,
    firstName: string,
    lastName: string,
    active: boolean,
    createdAt: Date
}

export interface UserLogin {
    email: string,
    firstName: string,
    lastName: string,
    active: boolean,
    createdAt: Date,
    accessToken: string;
} 
