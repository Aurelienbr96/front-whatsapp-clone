import {UserDomainModel} from '../user/user-domain.model';

export namespace AuthApiModel {
  export namespace Login {
    export type Input = {
      code: string;
      phoneNumber: string;
    };
    export type Output = UserDomainModel.User;
  }

  export namespace SendCode {
    export type Input = Pick<UserDomainModel.User, 'phoneNumber'>;
    export type Output = {message: string};
  }
}
