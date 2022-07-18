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
  async fetchAll(@Res() response) {
    const productVariants = await this.productVariantService.readAll();
    return response.status(HttpStatus.OK).json({
      productVariants,
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
