import { Inject, Injectable } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Interval } from '@nestjs/schedule';

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

  @Interval(5000)
  async countTweets() {
    console.log('Searching Tweets...');

    let offset = await this.cacheManager.get<number>('tweet-offset');

    offset = offset === undefined ? 0 : offset;

    console.log(` Offset: ${offset}`);

    const tweets = await this.tweetModel.findAll({
      offset,
      limit: this.limit,
    });

    console.log(`| ${tweets.length} Tweets Found`);

    this.emailsQueue.add({ tweets: tweets.map((t) => t.toJSON()) });
  }
}
