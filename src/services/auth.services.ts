import {CallWithoutToken, CallWithToken, ServerError, SerializePromese, ServerResponse} from '../globals/config/axios'

export class AuthenticationService {
    public async login(username:string,password:string): Promise<ServerResponse | ServerError> {
        const call = CallWithoutToken().post('/auth/login',{username,password})
        const response = await SerializePromese(call)
        return response
    }
    public async logout():Promise<ServerResponse | ServerError> {
        const call = CallWithToken().post('/auth/logout')
        const response = await SerializePromese(call)
        return response
    }
}

const authServiceInstace = new AuthenticationService()
export default authServiceInstace