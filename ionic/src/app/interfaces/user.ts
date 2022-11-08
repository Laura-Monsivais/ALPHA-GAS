
export interface User {
    id: number;
    name?: string;//nullable
    lastname1: string;
    lastname2?: string;//nullable
    cellphone: number;
    password: string;
    avatar?: string;//nullable
    avatarFile?: any;//nullable
    cover?: string;//nullable
    coverFile?: any,//nullable
    session_id: number;
    remember_token?: string;//nullable
}