import { UpdateProductCategoryDto } from './../dto/update-product-category.dto';
import {
  ProductCategoryFilter,
  CreateProductCategoryDto,
} from './../dto/create-product-category.dto';
import { ProductCategoryService } from './../services/product-category.service';
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
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product-category')
@ApiTags('Product Category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() product: CreateProductCategoryDto,
  ) {
    const newProduct = await this.productCategoryService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductCategoryFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productCategoryService.readAll(
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
    const product = await this.productCategoryService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductCategoryDto,
  ) {
    const updatedProduct = await this.productCategoryService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productCategoryService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
