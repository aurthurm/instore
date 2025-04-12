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
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, ProductFilter } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: CreateProductDto) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productService.readAll(
      {
        page,
        limit,
        route: request?.headers?.hostname,
      },
      filters,
    );
    return response.status(HttpStatus.OK).json(pagination);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
