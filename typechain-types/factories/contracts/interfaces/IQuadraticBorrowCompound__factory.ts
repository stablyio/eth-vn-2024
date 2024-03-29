/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IQuadraticBorrowCompound,
  IQuadraticBorrowCompoundInterface,
} from "../../../contracts/interfaces/IQuadraticBorrowCompound";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "borrowToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "ctoken",
        type: "address",
      },
    ],
    name: "addBorrowPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
    ],
    name: "borrowInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pid",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "repaidAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startBowShare",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "returnBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interests",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "state",
            type: "uint256",
          },
        ],
        internalType: "struct IQuadraticBorrowCompoundStorage.BorrowInfo",
        name: "borrow",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "borrowPoolInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "ctoken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "curBorrow",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "curBowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastShareBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "globalBowShare",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "globalLendInterestShare",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalMineInterests",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "overdueRate",
            type: "uint256",
          },
        ],
        internalType:
          "struct IQuadraticBorrowCompoundStorage.CompoundBorrowPool",
        name: "borrowPool",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "borrowUserInfos",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "currTotalBorrow",
            type: "uint256",
          },
        ],
        internalType: "struct IQuadraticBorrowCompoundStorage.BorrowUserInfo",
        name: "borrowUserInfo",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ctoken",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "doAfterLpTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "getBorrowingRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "getGlobalLendInterestShare",
    outputs: [
      {
        internalType: "uint256",
        name: "globalLendInterestShare",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "getLendingRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
    ],
    name: "settlementBorrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "toUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "interests",
        type: "uint256",
      },
    ],
    name: "transferInterestToLend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "updateBorrowPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IQuadraticBorrowCompound__factory {
  static readonly abi = _abi;
  static createInterface(): IQuadraticBorrowCompoundInterface {
    return new Interface(_abi) as IQuadraticBorrowCompoundInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IQuadraticBorrowCompound {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IQuadraticBorrowCompound;
  }
}
