import * as SecureStore from 'expo-secure-store';


const KEYS = {
    Bearer : "bearer"
}

const StoreService = {
    getBearerToken : async () : Promise<string> => {
       const token = await SecureStore.getItemAsync(KEYS.Bearer);
       if(token){
           return token
       }
       throw new Error("no bearer token found");
    },

    setBearerToken : async (token : string) : Promise<void>  =>  {
        await SecureStore.setItemAsync(KEYS.Bearer, token)
    }
}

export default StoreService;