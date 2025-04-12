import { ProductVariantFilter } from './../dto/create-product-variant.dto';
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
import { ProductVariantService } from '../services/product-variant.service';
import { CreateProductVariantsDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/product-variant')
@ApiTags('Product Variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post()
  async createVariant(
    @Res() response,
    @Body() productVariant: CreateProductVariantsDto,
  ) {
    const newProductVariants = await this.productVariantService.create(
      productVariant,
    );
    return response.status(HttpStatus.CREATED).json({
      count: newProductVariants.length,
      items: newProductVariants,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: ProductVariantFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.productVariantService.readAll(
      {
        page,
        limit,
        route: request?.headers?.hostname,
      },
      filters,
    );
    return response.status(HttpStatus.OK).json(pagination);
  }

  @Post('/add-variant-stocks')
  async addVariantStock(@Res() response, @Body() payload: any) {
    const variant = await this.productVariantService.addVariantStocks(payload);
    return response.status(HttpStatus.CREATED).json({
      item: variant,
    });
  }

  @Post('/transfer-variant-stocks')
  async transferVariantStocks(@Res() response, @Body() payload: any) {
    await this.productVariantService.transferVariantStocks(payload);
    return response.status(HttpStatus.CREATED).json({
      message: 'success',
    });
  }

  @Get('/:id/transfer-data')
  async getVariantStockTransferrability(@Res() response, @Param('id') id) {
    const data = await this.productVariantService.getStockTransferData(id);
    return response.status(HttpStatus.CREATED).json({
      items: data,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const productVariant = await this.productVariantService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: productVariant,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() productVariant: UpdateProductVariantDto,
  ) {
    const updatedProductVariant = await this.productVariantService.update(
      id,
      productVariant,
    );
    return response.status(HttpStatus.OK).json({
      item: updatedProductVariant,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedProductVariant = await this.productVariantService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedProductVariant,
    });
  }
}
