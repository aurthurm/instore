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
  CreateProductVariantAttributeDto,
  ProductVariantAttributeFilter,
} from '../dto/create-product-variant-attribute.dto';
import { UpdateProductVariantAttributeDto } from '../dto/update-product-variant-attribute.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductVariantAttributeService } from '../services';

@Controller('api/product-variant-attribute')
@ApiTags('Product Variant Attribute')
export class ProductVariantAttributeController {
  constructor(
    private readonly productVariantAttributeService: ProductVariantAttributeService,
  ) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() product: CreateProductVariantAttributeDto,
  ) {
    const newProduct = await this.productVariantAttributeService.create(
      product,
    );
    return response.status(HttpStatus.CREATED).json({
      item: newProduct,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductVariantAttributeFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productVariantAttributeService.readAll(
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
    const product = await this.productVariantAttributeService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateProductVariantAttributeDto,
  ) {
    const updatedProduct = await this.productVariantAttributeService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      item: updatedProduct,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProduct = await this.productVariantAttributeService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProduct,
    });
  }
}
