export interface signUp {
    username:string,
    email:string,
    password:string,
    _id?:string,
    type?:string,
    status?:string,
}

export interface signIn{
    email:string,
    password:string,
}

export interface todo{
    completed:boolean,
    title:string,
    _id:string
}