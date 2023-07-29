import { Chance } from 'chance';
import { UserFakeBuilder } from '../user-fake-builder';
import { UserId } from '../user';

describe('UserFakeBuilder Unit Tests', () => {
  describe('entity_id prop', () => {
    const faker = UserFakeBuilder.aUser();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('entity_id')).toThrow(
        new Error("Property entity_id not have a factory, use 'with' methods"),
      );
    });

    it('should be undefined', () => {
      expect(faker['_entity_id']).toBeUndefined();
    });

    test('withEntityId', () => {
      const userId = new UserId();
      const $this = faker.withEntityId(userId);
      expect($this).toBeInstanceOf(UserFakeBuilder);
      expect(faker['_entity_id']).toBe(userId);

      faker.withEntityId(() => userId);
      expect(faker['_entity_id']()).toBe(userId);
      console.log(faker.entity_id);
      expect(faker.entity_id).toBe(userId);
    });

    it('should pass index to unique_entity_id factory', () => {
      let mockFactory = jest.fn().mockReturnValue(new UserId());
      faker.withEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest.fn().mockReturnValue(new UserId());
      const fakerMany = UserFakeBuilder.theUsers(2);
      fakerMany.withEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  describe('name prop', () => {
    const faker = UserFakeBuilder.aUser();
    it('should be a function', () => {
      expect(typeof faker['_name'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, 'word');
      faker['chance'] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test('withName', () => {
      const $this = faker.withName('test name');
      expect($this).toBeInstanceOf(UserFakeBuilder);
      expect(faker['_name']).toBe('test name');

      faker.withName(() => 'test name');
      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe('test name');

      expect(faker.name).toBe('test name');
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `test name ${index}`);
      const user = faker.build();
      expect(user.name).toBe(`test name 0`);

      const fakerMany = UserFakeBuilder.theUsers(2);
      fakerMany.withName((index) => `test name ${index}`);
      const categories = fakerMany.build();

      expect(categories[0].name).toBe(`test name 0`);
      expect(categories[1].name).toBe(`test name 1`);
    });

    test('invalid empty case', () => {
      const $this = faker.withInvalidNameEmpty(undefined);
      expect($this).toBeInstanceOf(UserFakeBuilder);
      expect(faker['_name']).toBeUndefined();

      faker.withInvalidNameEmpty(null);
      expect(faker['_name']).toBeNull();

      faker.withInvalidNameEmpty('');
      expect(faker['_name']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = faker.withInvalidNameTooLong();
      expect($this).toBeInstanceOf(UserFakeBuilder);
      expect(faker['_name'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      faker.withInvalidNameTooLong(tooLong);
      expect(faker['_name'].length).toBe(256);
      expect(faker['_name']).toBe(tooLong);
    });
  });
});
