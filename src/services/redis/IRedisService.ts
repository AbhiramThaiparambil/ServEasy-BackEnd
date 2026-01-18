import { IUser } from "../../domain/entities/IUser";

export interface IRedisService {
  set(key: string, value: string, expiry: number): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;

  setLock(key: string, ttlSeconds: number): Promise<boolean>;
  releaseLock(key: string): Promise<void>;
  isLocked(key: string): Promise<boolean>;

  saveUser(userKey: string, user: IUser): Promise<void>;
  getUser(userKey: string): Promise<IUser | null>;
}
