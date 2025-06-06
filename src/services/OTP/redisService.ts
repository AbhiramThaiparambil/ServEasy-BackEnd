import {injectable} from "tsyringe"
import Redis  from "ioredis"
import {config} from "dotenv"
config()
@injectable()

export class RedisService{

    private client!:Redis;
    constructor(){
        const redisUrl=process.env.REDIS_URL
        if(!redisUrl){
            throw  new Error('"REDIS_URL is not defined in the environment variables"')
        }
        this.client=new Redis(redisUrl);
 
        this.client.on("error",(err)=>{
            console.log('redis Error ');
            
            console.log(err);
            
        });
    }
    
    async set(key:string,otp:string,expiry:number):Promise<void>{
        const res = await this.client.set(key,otp,"EX",expiry)
        console.log(res);
        
    }

async get(key:string):Promise<string|null>{
    return await this.client.get(key)
}

async delete(key:string):Promise<void>{
    await this.client.del(key)
}

}

    