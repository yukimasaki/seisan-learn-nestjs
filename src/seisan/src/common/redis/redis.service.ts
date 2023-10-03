import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis = new Redis({
    host: 'redis-container',
    port: 6379,
  });

  async findOne(key: string) {
    return await this.redis.get(key);
  }

  async setValue(key: string, value: string) {
    return await this.redis.set(key, value);
  }
}
