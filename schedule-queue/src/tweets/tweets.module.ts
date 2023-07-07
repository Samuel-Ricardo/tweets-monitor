import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { TweetsCountService } from './tweets-count/tweets-count.service';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService, TweetsCountService],
})
export class TweetsModule {}
