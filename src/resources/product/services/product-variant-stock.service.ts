import { ProductVariantStockFilter } from './../dto/create-product-variant-stock.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { ProductVariantStockDto } from '../dto/create-product-variant-stock.dto';
import { ProductVariantStock } from '../entities/product-variant-stock.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductVariantStockService {
  constructor(
    @InjectRepository(ProductVariantStock)
    private productVariantStockRepository: Repository<ProductVariantStock>,
  ) {}

  async create(
    productVariantStock: ProductVariantStockDto,
    quantity: number,
  ): Promise<ProductVariantStock[]> {
    const created = [];
    console.log(`Adding Variant Stocks ${quantity}`);
    for (const _ of [...Array(+quantity)]) {
      const product_variant_stock =
        await this.productVariantStockRepository.save({
          ...prepareForCreate(productVariantStock),
          product_variant: productVariantStock.product_variant,
          quantity: 1,
        });
      if (product_variant_stock) {
        created.push(product_variant_stock);
      }
    }
    return created;
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductVariantStockFilter,
  ): Promise<Pagination<ProductVariantStock>> {
    return await paginate<ProductVariantStock>(
      this.productVariantStockRepository,
      options,
      {
        where: {
          product_variant: {
            id: filters.product_variant,
          },
        },
        relations: ['product_variant', 'warehouse'],
      } as any,
    );
  }

  async getTransferData(variantId: string): Promise<any> {
    const data = await this.productVariantStockRepository
      .createQueryBuilder('stocks')
      .leftJoinAndSelect('stocks.warehouse', 'warehouse')
      .select(
        'warehouse.id AS warehouse_id, warehouse.name AS warehouse_name, COUNT(stocks.warehouse) As total',
      )
      .where('stocks.product_variant = :id', { id: variantId })
      .groupBy('warehouse.id')
      .getRawMany();

    return data;
  }

  async transferVariantStocks(payload: any): Promise<any> {
    // filter fetch
    const stocks = await this.productVariantStockRepository.find({
      where: {
        warehouse: {
          id: payload.from,
        },
        product_variant: {
          id: payload.product_variant,
        },
        status: 'hidden',
      },
      take: +payload.quantity,
    });
    console.log(payload);
    console.log(stocks);
    // transfer to another warehouse
    for (const _stock of stocks) {
      await this.update(_stock.id, { warehouse: payload.to });
    }
  }

  async readById(id: string): Promise<ProductVariantStock> {
    return await this.productVariantStockRepository.findOneBy({ id });
  }

  async update(id: string, productVariant: any): Promise<any> {
    return await this.productVariantStockRepository.update(
      { id },
      prepareForUpdate(productVariant),
    );
  }

  async delete(id): Promise<any> {
    return await this.productVariantStockRepository.delete(id);
  }
}
