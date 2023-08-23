export class UserAlreadyExistsError extends Error {
  constructor(invalidType: any) {
    super(`User already exists: ${invalidType}`);
    this.name = 'UserExistsError';
  }
}
