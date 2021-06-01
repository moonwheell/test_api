import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Manufacturer } from '../manufacturers/manufacturer.entity';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  price: number;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.games)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn({ name: 'release_date' })
  releaseDate: Date;

  @Column({ default: false })
  IsDiscountApplied: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;
}
