import { ApiProperty } from '@nestjs/swagger';

export class StatusMessageDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  source: string;
  @ApiProperty()
  ok: boolean;
  @ApiProperty()
  resultId?: string;
  constructor(source: string) {
    this.message = '';
    this.ok = false;
    this.source = source;
  }
}
