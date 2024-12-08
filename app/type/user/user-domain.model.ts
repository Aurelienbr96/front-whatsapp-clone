export namespace UserDomainModel {
  export type User = {
    id: string;
    avatar?: string;
    isVerified: boolean;
    phoneNumber: string;
    userName?: string;
  };

  export const nullUser: User = {
    id: '',
    avatar: undefined,
    isVerified: false,
    phoneNumber: '',
    userName: undefined,
  };
}
