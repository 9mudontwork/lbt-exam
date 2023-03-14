import { BoolBitTransformer } from '@/src/utils/booleanTransformer';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class EmailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @Column()
  provider: string;

  @Column({ type: 'text', default: null })
  errorMessage: string;

  /**
   * transform boolean
   * ref: https://stackoverflow.com/questions/55224483/loading-a-bit-mysql-field-from-typeorm
   */
  @Column({
    // type: 'bit',
    // width: 1,
    default: false,
    nullable: false,
    // transformer: new BoolBitTransformer(),
    // transformer: { from: (v: Buffer) => !!v?.readInt8(0), to: (v) => v },
  })
  isError: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
