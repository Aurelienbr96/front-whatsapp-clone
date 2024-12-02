import {UserDomainModel} from './user-domain.model';

export namespace UserApiModel {
  export namespace CreateOne {
    export type Input = Pick<UserDomainModel.User, 'phoneNumber'>;
    export type Output = UserDomainModel.User;
  }
}
