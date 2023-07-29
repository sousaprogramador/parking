import { User } from './user';

describe('User Integration Tests', () => {
  describe('create method', () => {
    test('invalidation cases for name field', () => {
      expect(() => new User({ name: null } as any)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
      });

      expect(() => new User({ name: '' } as any)).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => new User({ name: 5 } as any)).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
      });

      expect(
        () => new User({ name: 't'.repeat(256) } as any),
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    test('invalidation cases for email field', () => {
      expect(() => new User({ email: null } as any)).containsErrorMessages({
        email: [
          'email must be an email',
          'email should not be empty',
          'email must be shorter than or equal to 255 characters',
          'email must be a string',
        ],
      });

      expect(() => new User({ email: '' } as any)).containsErrorMessages({
        email: ['email must be an email', 'email should not be empty'],
      });

      expect(() => new User({ email: 5 } as any)).containsErrorMessages({
        email: [
          'email must be an email',
          'email must be shorter than or equal to 255 characters',
          'email must be a string',
        ],
      });

      expect(
        () => new User({ name: 't'.repeat(256) } as any),
      ).containsErrorMessages({
        email: [
          'email must be an email',
          'email should not be empty',
          'email must be shorter than or equal to 255 characters',
          'email must be a string',
        ],
      });
    });

    test('invalidation cases for password field', () => {
      expect(() => new User({ password: null } as any)).containsErrorMessages({
        password: [
          'password should not be empty',
          'password must be shorter than or equal to 255 characters',
          'password must be a string',
        ],
      });

      expect(() => new User({ password: '' } as any)).containsErrorMessages({
        password: ['password should not be empty'],
      });

      expect(() => new User({ password: 5 } as any)).containsErrorMessages({
        password: [
          'password must be shorter than or equal to 255 characters',
          'password must be a string',
        ],
      });

      expect(
        () => new User({ password: 't'.repeat(256) } as any),
      ).containsErrorMessages({
        password: ['password must be shorter than or equal to 255 characters'],
      });
    });
  });
});
