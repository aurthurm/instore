import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  Query,
  Request,
  DefaultValuePipe,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import {
  CreateProductAttributeDto,
  ProductAttributeFilter,
} from '../dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from '../dto/update-product-attribute.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductAttributeService } from '../services';

@Controller('api/product-attribute')
@ApiTags('Product Attribute')
export class ProductAttributeController {
  constructor(
    private readonly productAttributeService: ProductAttributeService,
  ) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() product: CreateProductAttributeDto,
  ) {
    const newProduct = await this.productAttributeService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductAttributeFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productAttributeService.readAll(
      {
        page,
        limit,
        route: request?.headers?.hostname,
      },
      filters,
    );
    return response.status(HttpStatus.OK).json(pagination);
  }

  @Get('/filter')
  async filter(@Res() response, @Query() filters: ProductAttributeFilter) {
    const results = await this.productAttributeService.readBy(filters);
    return response.status(HttpStatus.OK).json({
      items: results,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productAttributeService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductAttributeDto,
  ) {
    const updatedProduct = await this.productAttributeService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productAttributeService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
