import { Module } from '@nestjs/common';
import { MeilerService } from './service/meiler.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MeilerService],
  exports: [MeilerService],
})
export class MeilerModule {}
