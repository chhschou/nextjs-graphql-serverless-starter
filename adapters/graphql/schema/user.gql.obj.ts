import { Field, ObjectType, ID } from 'type-graphql';
import { UserDto } from '../../../user/user.dto';

@ObjectType()
export class User implements UserDto {
  @Field((_) => ID)
  id: string;

  @Field()
  login: string;

  @Field()
  avatar_url: string;
}
