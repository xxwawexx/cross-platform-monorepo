import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();

    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl?.startsWith('postgresql')) {
      this.logger.log('✅ ====== CONNECTED TO POSTGRESQL ====== ✅');
    } else if (dbUrl?.startsWith('file:')) {
      this.logger.log(`✅ ====== CONNECTED TO SQLITE (${dbUrl}) ====== ✅`);
    } else {
      this.logger.warn(
        '⚠️  Could not determine database type from DATABASE_URL.'
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
