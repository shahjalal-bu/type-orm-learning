import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "./Profile";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  // @OneToOne(() => Profile)
  @OneToOne(() => Profile, { cascade: true, eager: true, onDelete: "CASCADE" }) // this told first profile add then user add
  @JoinColumn()
  profile: Profile;
}
