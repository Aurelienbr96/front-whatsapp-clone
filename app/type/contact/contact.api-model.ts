import {UserDomainModel} from '../user/user-domain.model';

export namespace ContactApiModel {
  export namespace GetUserContacts {
    export type Input = void;
    export type Output = Omit<UserDomainModel.User, 'isVerifier'>[];
  }
}
