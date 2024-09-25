import { Module } from '@nestjs/common';
import { ScrapersModule } from './scrapers/scrapers.module';

@Module({
  imports: [ScrapersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
