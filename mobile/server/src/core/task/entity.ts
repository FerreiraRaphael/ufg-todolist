import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public text: string

  @Column()
  public completed: boolean
}
