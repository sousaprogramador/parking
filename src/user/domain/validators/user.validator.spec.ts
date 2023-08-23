import { UserValidatorFactory } from './user.validator';

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

    expect({ validator, data: { name: null } }).containsErrorMessages({
      email: [
        'email must be an email',
        'email should not be empty',
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
      ],
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      email: [
        'email must be an email',
        'email should not be empty',
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
      ],
    });
  });
});
