import { Resolver, Arg, Query } from 'type-graphql';
import { User } from '../schema/user.gql.obj';

@Resolver(User)
export class UserResolver {
  @Query((_) => User)
  public async user(@Arg('id') id: string) {
    return {
      id: 'an id',
      login: 'test login',
      avatar_url: 'https://avatar.com/avatar',
    };
  }

  @Query((_) => [User!])
  public async users() {
    return [
      {
        id: 'an id',
        login: 'test login',
        avatar_url: 'https://avatar.com/avatar',
      },
    ];
  }
}
