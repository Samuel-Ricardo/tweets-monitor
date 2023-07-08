import { Inject, Injectable } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TweetsCountService {
  private limit = 10;

  constructor(
    @Inject(Tweet)
    private tweetModel: typeof Tweet,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}
}
