import connectAndDefineDB from './defineDB';

const {
  Claim,
  Report,
  Account,
  connection,
} = connectAndDefineDB();

export {
  connection,
  Account,
  Report,
  Claim,
};
