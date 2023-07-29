import { User, UserId, UserProperties } from './user';
import { omit } from 'lodash';
describe('User Unit Tests', () => {
  test('constructor of User', () => {
    const user = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
    });
    const props = omit(user.props, 'created_at');
    expect(props).toStrictEqual({
      name: 'Some testing',
      email: 'mail@testing.com',
      is_active: true,
      avatar: null,
      password: '123456',
    });
    expect(user.props.created_at).toBeInstanceOf(Date);
  });

  describe('id field', () => {
    type Roleata = { props: UserProperties; id?: UserId };
    const arrange: Roleata[] = [
      {
        props: {
          name: 'Some testing',
          email: 'mail@testing.com',
          password: '123456',
        },
      },
      {
        props: {
          name: 'Some testing',
          email: 'mail@testing.com',
          password: '123456',
        },
        id: null,
      },
      {
        props: {
          name: 'Some testing',
          email: 'mail@testing.com',
          password: '123456',
        },
        id: undefined,
      },
      {
        props: {
          name: 'Some testing',
          email: 'mail@testing.com',
          password: '123456',
        },
        id: new UserId(),
      },
    ];

    test.each(arrange)('when props is %j', (item) => {
      const user = new User(item.props, item.id as any);
      expect(user.id).not.toBeNull();
      expect(user.entityId).toBeInstanceOf(UserId);
    });
  });
});
