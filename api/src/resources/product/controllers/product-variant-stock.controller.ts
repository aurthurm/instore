import { ProductVariantStockFilter } from '../dto/create-product-variant-stock.dto';
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
import { ProductVariantStockService } from '../services/product-variant-stock.service';
import { ProductVariantStockDto } from '../dto/create-product-variant-stock.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product-variant-stock')
@ApiTags('Product Variant Stock')
export class ProductVariantStockController {
  constructor(
    private readonly productVariantStockService: ProductVariantStockService,
  ) {}

  @Post()
  async createVariant(
    @Res() response,
    @Body() productVariantStock: ProductVariantStockDto,
  ) {
    const newProductVariantStocks =
      await this.productVariantStockService.create(
        productVariantStock,
        productVariantStock.quantity,
      );
    return response.status(HttpStatus.CREATED).json({
      count: newProductVariantStocks.length,
      items: newProductVariantStocks,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductVariantStockFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productVariantStockService.readAll(
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
    const productVariant = await this.productVariantStockService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: productVariant,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() productVariant: ProductVariantStockDto,
  ) {
    const updatedProductVariantStock =
      await this.productVariantStockService.update(id, productVariant);
    return response.status(HttpStatus.OK).json({
      item: updatedProductVariantStock,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProductVariantStock =
      await this.productVariantStockService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProductVariantStock,
    });
  }
}
