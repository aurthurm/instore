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
  CreateProductVariantMetaDto,
  ProductVariantMetaFilter,
} from '../dto/create-product-variant-meta.dto';
import { UpdateProductVariantMetaDto } from '../dto/update-product-variant-meta.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductVariantMetaService } from '../services';

@Controller('api/product-variant-meta')
@ApiTags('Product Variant Meta')
export class ProductVariantMetaController {
  constructor(
    private readonly productVariantMetaService: ProductVariantMetaService,
  ) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() product: CreateProductVariantMetaDto,
  ) {
    const newProduct = await this.productVariantMetaService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductVariantMetaFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productVariantMetaService.readAll(
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
    const product = await this.productVariantMetaService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductVariantMetaDto,
  ) {
    const updatedProduct = await this.productVariantMetaService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productVariantMetaService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
