export namespace UserDomainModel {
  export type User = {
    id: string;
    avatar?: string;
    isVerified: boolean;
    phoneNumber: string;
    username?: string;
  };
}
