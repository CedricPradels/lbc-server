import randomstring from "randomstring";

import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

const encrypt = (str: string): string => sha256(str).toString(Base64);
const createRandomStr = (): string => randomstring.generate(64);
const createHash = ({
  salt,
  password,
}: {
  salt: string;
  password: string;
}): string => encrypt(salt + password);

export const createAuthentication = (
  password: string
): { hash: string; token: string; salt: string } => {
  const token = createRandomStr();
  const salt = createRandomStr();
  const hash = createHash({ salt, password });
  return { token, salt, hash };
};
