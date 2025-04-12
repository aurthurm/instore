import { ProductMediaService } from './../services/product-media.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product-media')
@ApiTags('Product Media')
export class ProductMediaController {
  constructor(private readonly productMediaService: ProductMediaService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: CreateProductDto) {
    const newProduct = await this.productMediaService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productMediaService.readAll();
    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productMediaService.readById(id);
    return response.status(HttpStatus.OK).json({
      product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductDto,
  ) {
    const updatedProduct = await this.productMediaService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productMediaService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedProduct,
    });
  }
}
