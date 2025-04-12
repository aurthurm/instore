import { ProductCollectionService } from './../services/product-collection.service';
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

@Controller('api/product-collection')
@ApiTags('Product Collection')
export class ProductCollectionController {
  constructor(
    private readonly productCollectionService: ProductCollectionService,
  ) {}

  @Post()
  async createProduct(@Res() response, @Body() product: CreateProductDto) {
    const newProduct = await this.productCollectionService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productCollectionService.readAll();
    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productCollectionService.readById(id);
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
    const updatedProduct = await this.productCollectionService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productCollectionService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedProduct,
    });
  }
}
