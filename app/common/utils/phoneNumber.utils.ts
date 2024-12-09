import parsePhoneNumberFromString from 'libphonenumber-js';

export const formatPhoneNumberToInternationalFormat = (phoneNumber: string) =>
  parsePhoneNumberFromString(phoneNumber)?.format('INTERNATIONAL');
