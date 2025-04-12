import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class InStoreBase {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  updatedBy: string;
}
