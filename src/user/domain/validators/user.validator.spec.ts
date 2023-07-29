import UserValidatorFactory from './user.validator';

describe('UserValidator Tests', () => {
  let validator: UserValidatorFactory;

  beforeEach(() => (validator = UserValidatorFactory.create()));

  test('invalidation cases for name field', () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      name: ['name should not be empty'],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({
      validator,
      data: { name: 't'.repeat(256) },
    }).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    });
  });

  test('invalidation cases for email field', () => {
    expect({ validator, data: null }).containsErrorMessages({
      email: [
        'email must be an email',
        'email should not be empty',
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
      ],
    });

    expect({ validator, data: { email: null } }).containsErrorMessages({
      email: [
        'email must be an email',
        'email should not be empty',
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
      ],
    });

    expect({ validator, data: { email: '' } }).containsErrorMessages({
      email: ['email must be an email', 'email should not be empty'],
    });

    expect({ validator, data: { email: 5 as any } }).containsErrorMessages({
      email: [
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
      ],
    });

    expect({
      validator,
      data: { email: 't'.repeat(256) },
    }).containsErrorMessages({
      email: [
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ],
    });
  });

  test('invalidation cases for password field', () => {
    expect({ validator, data: null }).containsErrorMessages({
      password: [
        'password should not be empty',
        'password must be shorter than or equal to 255 characters',
        'password must be a string',
      ],
    });

    expect({ validator, data: { password: null } }).containsErrorMessages({
      password: [
        'password should not be empty',
        'password must be shorter than or equal to 255 characters',
        'password must be a string',
      ],
    });

    expect({ validator, data: { password: '' } }).containsErrorMessages({
      password: ['password should not be empty'],
    });

    expect({ validator, data: { password: 5 as any } }).containsErrorMessages({
      password: [
        'password must be shorter than or equal to 255 characters',
        'password must be a string',
      ],
    });

    expect({
      validator,
      data: { password: 't'.repeat(256) },
    }).containsErrorMessages({
      password: ['password must be shorter than or equal to 255 characters'],
    });
  });
});
