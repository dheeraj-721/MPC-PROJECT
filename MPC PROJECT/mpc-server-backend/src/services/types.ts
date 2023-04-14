import { BigNumber } from "ethers";

export class UserOp  {
  sender: string;
  message: string;
  to: string;
  amount: BigNumber;
  signature: Signature;
};

export class Signature  {
  r: string;
  s: string;
  v: number;
};
