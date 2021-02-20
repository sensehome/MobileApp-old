export class LoginDto {
    name: string = ""
    password: string = ""
}


export interface TokenDto {
    bearer : string
}