import { User, UserId } from './user';
import { Chance } from 'chance';

type PropOrFactory<T> = T | ((index: number) => T);

export class UserFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _email: PropOrFactory<string> = (_index) => this.chance.email();
  private _password: PropOrFactory<string> = (_index) => this.chance.word();
  private _avatar: PropOrFactory<string | null> = (_index) =>
    this.chance.word();
  private _is_active: PropOrFactory<boolean> = (_index) => true;
  // auto generated in entity
  private _created_at = undefined;

  private countObjs = 1;

  static aUser() {
    return new UserFakeBuilder<User>();
  }

  static theUsers(countObjs: number) {
    return new UserFakeBuilder<User[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withEntityId(valueOrFactory: PropOrFactory<UserId>) {
    this._entity_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: '' | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withEmail(valueOrFactory: PropOrFactory<string>) {
    this._email = valueOrFactory;
    return this;
  }

  withAvatar(valueOrFactory: PropOrFactory<string | null>) {
    this._avatar = valueOrFactory;
    return this;
  }

  activate() {
    this._is_active = true;
    return this;
  }

  deactivate() {
    this._is_active = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: '' | null | undefined) {
    this._is_active = value as any;
    return this;
  }

  withInvalidIsActiveNotABoolean(value?: any) {
    this._is_active = value ?? 'fake boolean';
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const users = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new User(
          {
            name: this.callFactory(this._name, index),
            email: this.callFactory(this._email, index),
            password: this.callFactory(this._password, index),
            avatar: this.callFactory(this._avatar, index),
            is_active: this.callFactory(this._is_active, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._entity_id
            ? undefined
            : this.callFactory(this._entity_id, index),
        ),
    );
    return this.countObjs === 1 ? (users[0] as any) : users;
  }

  get entity_id() {
    return this.getValue('entity_id');
  }

  get name() {
    return this.getValue('name');
  }

  get email() {
    return this.getValue('email');
  }

  get password() {
    return this.getValue('password');
  }

  get avatar() {
    return this.getValue('avatar');
  }

  get is_active() {
    return this.getValue('is_active');
  }

  get created_at() {
    return this.getValue('created_at');
  }

  private getValue(prop) {
    const optional = ['entity_id', 'created_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
