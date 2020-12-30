import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { GoodsEntity } from '../entity/goods.entity';
import { GoodsService } from '../service/goods.service';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@ApiTags('goods')
@Controller('api/goods')
export class GoodsController {
  constructor(private service: GoodsService) {}

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string): Promise<GoodsEntity> {
    return await this.service.getById(id);
  }

  @Post('query')
  async query(@Body() queryDto: QueryEntityDto): Promise<GoodsEntity[]> {
    return this.service.query(queryDto);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Post('create-or-update')
  async update(@Body() entity: GoodsEntity): Promise<StatusMessageDto> {
    return this.service.createOrEdit(entity);
  }

  @Post('upload/:photoType/:id')
  @UseGuards(ManagerJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/photos',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file, @Param() params) {
    return await this.service.savePhotoUrl(
      params.id,
      params.photoType,
      file.filename,
    );
  }
}
