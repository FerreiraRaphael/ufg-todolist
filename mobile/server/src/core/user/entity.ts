import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public version: string

  @Column()
  public name: string

  @Column({
    unique: true
  })
  public email: string

  @Column()
  public password: string
}
