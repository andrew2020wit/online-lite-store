import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MdGeneratorService } from './md-generator.service';

@Controller('api/md-generator')
export class MdGeneratorController {
  constructor(private mdGeneratorService: MdGeneratorService) {}

  // http://127.0.0.1:3001/api/md-generator
  @ApiTags('testing')
  @Get()
  async init() {
    await this.mdGeneratorService.create();

    return 'Done';
  }
}
