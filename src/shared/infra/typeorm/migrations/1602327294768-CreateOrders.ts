import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrders1602327294768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: true,
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
            referencedTableName: 'customers',
            columnNames: ['customer_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('orders');
    const foreignKey = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf('customer_id') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey('orders', foreignKey);
    }

    await queryRunner.dropTable('orders');
  }
}
