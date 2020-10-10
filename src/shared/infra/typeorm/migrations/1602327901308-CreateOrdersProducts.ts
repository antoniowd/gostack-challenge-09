import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersProducts1602327901308
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 18,
            scale: 2,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            columnNames: ['order_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            columnNames: ['product_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('orders_products');
    const foreignKeyOrderId = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf('order_id') !== -1,
    );

    const foreignKeyProductId = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf('product_id') !== -1,
    );

    if (foreignKeyOrderId) {
      await queryRunner.dropForeignKey('orders_products', foreignKeyOrderId);
    }

    if (foreignKeyProductId) {
      await queryRunner.dropForeignKey('orders_products', foreignKeyProductId);
    }

    await queryRunner.dropTable('orders_products');
  }
}
