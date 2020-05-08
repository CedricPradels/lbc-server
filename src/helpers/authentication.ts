import randomstring from "randomstring";

import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

type password = string;
type salt = string;
type hash = string;
type token = string;

const encrypt = (str: string): string => sha256(str).toString(Base64);
const createRandomStr = (): string => randomstring.generate(64);
const createHash = ({
  salt,
  password,
}: {
  salt: salt;
  password: password;
}): hash => encrypt(salt + password);

export const createAuthentication = (
  password: password
): { hash: hash; token: token; salt: salt } => {
  const token = createRandomStr();
  const salt = createRandomStr();
  const hash = createHash({ salt, password });
  return { token, salt, hash };
};

export const checkPassword = ({
  password,
  hash,
  salt,
}: {
  password: password;
  hash: hash;
  salt: salt;
}): boolean => createHash({ password, salt }) === hash;
