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
} from '@nestjs/common';
import {
  CreateProductTypeDto,
  ProductTypeFilter,
} from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductTypeService } from '../services';

@Controller('api/product-type')
@ApiTags('Product Type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: CreateProductTypeDto) {
    const newProduct = await this.productTypeService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductTypeFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productTypeService.readAll(
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
    const product = await this.productTypeService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductTypeDto,
  ) {
    const updatedProduct = await this.productTypeService.update(id, product);
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productTypeService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
