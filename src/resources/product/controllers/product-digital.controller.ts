import { ProductDigitalService } from './../services/product-digital.service';
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
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product-digital')
@ApiTags('Product Digital')
export class ProductDigitalController {
  constructor(private readonly productDigitalService: ProductDigitalService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: CreateProductDto) {
    const newProduct = await this.productDigitalService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productDigitalService.readAll();
    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productDigitalService.readById(id);
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
    const updatedProduct = await this.productDigitalService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productDigitalService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedProduct,
    });
  }
}
