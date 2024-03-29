/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace IQuadraticBorrowCompoundStorage {
  export type BorrowInfoStruct = {
    user: AddressLike;
    pid: BigNumberish;
    tokenId: BigNumberish;
    borrowValue: BigNumberish;
    amount: BigNumberish;
    repaidAmount: BigNumberish;
    startBowShare: BigNumberish;
    startBlock: BigNumberish;
    returnBlock: BigNumberish;
    interests: BigNumberish;
    state: BigNumberish;
  };

  export type BorrowInfoStructOutput = [
    user: string,
    pid: bigint,
    tokenId: bigint,
    borrowValue: bigint,
    amount: bigint,
    repaidAmount: bigint,
    startBowShare: bigint,
    startBlock: bigint,
    returnBlock: bigint,
    interests: bigint,
    state: bigint
  ] & {
    user: string;
    pid: bigint;
    tokenId: bigint;
    borrowValue: bigint;
    amount: bigint;
    repaidAmount: bigint;
    startBowShare: bigint;
    startBlock: bigint;
    returnBlock: bigint;
    interests: bigint;
    state: bigint;
  };

  export type CompoundBorrowPoolStruct = {
    token: AddressLike;
    ctoken: AddressLike;
    curBorrow: BigNumberish;
    curBowRate: BigNumberish;
    lastShareBlock: BigNumberish;
    globalBowShare: BigNumberish;
    globalLendInterestShare: BigNumberish;
    totalMineInterests: BigNumberish;
    overdueRate: BigNumberish;
  };

  export type CompoundBorrowPoolStructOutput = [
    token: string,
    ctoken: string,
    curBorrow: bigint,
    curBowRate: bigint,
    lastShareBlock: bigint,
    globalBowShare: bigint,
    globalLendInterestShare: bigint,
    totalMineInterests: bigint,
    overdueRate: bigint
  ] & {
    token: string;
    ctoken: string;
    curBorrow: bigint;
    curBowRate: bigint;
    lastShareBlock: bigint;
    globalBowShare: bigint;
    globalLendInterestShare: bigint;
    totalMineInterests: bigint;
    overdueRate: bigint;
  };

  export type BorrowUserInfoStruct = { currTotalBorrow: BigNumberish };

  export type BorrowUserInfoStructOutput = [currTotalBorrow: bigint] & {
    currTotalBorrow: bigint;
  };
}

export interface IQuadraticBorrowCompoundInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addBorrowPool"
      | "borrowInfo"
      | "borrowPoolInfo"
      | "borrowUserInfos"
      | "doAfterLpTransfer"
      | "getBorrowingRate"
      | "getGlobalLendInterestShare"
      | "getLendingRate"
      | "settlementBorrow"
      | "transferInterestToLend"
      | "updateBorrowPool"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addBorrowPool",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowPoolInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowUserInfos",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "doAfterLpTransfer",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowingRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getGlobalLendInterestShare",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLendingRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settlementBorrow",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferInterestToLend",
    values: [BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBorrowPool",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addBorrowPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrowInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "borrowPoolInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowUserInfos",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "doAfterLpTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGlobalLendInterestShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLendingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settlementBorrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferInterestToLend",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateBorrowPool",
    data: BytesLike
  ): Result;
}

export interface IQuadraticBorrowCompound extends BaseContract {
  connect(runner?: ContractRunner | null): IQuadraticBorrowCompound;
  waitForDeployment(): Promise<this>;

  interface: IQuadraticBorrowCompoundInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addBorrowPool: TypedContractMethod<
    [borrowToken: AddressLike, ctoken: AddressLike],
    [void],
    "nonpayable"
  >;

  borrowInfo: TypedContractMethod<
    [bid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.BorrowInfoStructOutput],
    "view"
  >;

  borrowPoolInfo: TypedContractMethod<
    [pid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.CompoundBorrowPoolStructOutput],
    "view"
  >;

  borrowUserInfos: TypedContractMethod<
    [user: AddressLike, pid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.BorrowUserInfoStructOutput],
    "view"
  >;

  doAfterLpTransfer: TypedContractMethod<
    [
      ctoken: AddressLike,
      sender: AddressLike,
      recipient: AddressLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getBorrowingRate: TypedContractMethod<[pid: BigNumberish], [bigint], "view">;

  getGlobalLendInterestShare: TypedContractMethod<
    [pid: BigNumberish],
    [bigint],
    "view"
  >;

  getLendingRate: TypedContractMethod<[pid: BigNumberish], [bigint], "view">;

  settlementBorrow: TypedContractMethod<
    [bid: BigNumberish],
    [void],
    "nonpayable"
  >;

  transferInterestToLend: TypedContractMethod<
    [pid: BigNumberish, toUser: AddressLike, interests: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateBorrowPool: TypedContractMethod<
    [pid: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addBorrowPool"
  ): TypedContractMethod<
    [borrowToken: AddressLike, ctoken: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "borrowInfo"
  ): TypedContractMethod<
    [bid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.BorrowInfoStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "borrowPoolInfo"
  ): TypedContractMethod<
    [pid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.CompoundBorrowPoolStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "borrowUserInfos"
  ): TypedContractMethod<
    [user: AddressLike, pid: BigNumberish],
    [IQuadraticBorrowCompoundStorage.BorrowUserInfoStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "doAfterLpTransfer"
  ): TypedContractMethod<
    [
      ctoken: AddressLike,
      sender: AddressLike,
      recipient: AddressLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getBorrowingRate"
  ): TypedContractMethod<[pid: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getGlobalLendInterestShare"
  ): TypedContractMethod<[pid: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getLendingRate"
  ): TypedContractMethod<[pid: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "settlementBorrow"
  ): TypedContractMethod<[bid: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferInterestToLend"
  ): TypedContractMethod<
    [pid: BigNumberish, toUser: AddressLike, interests: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateBorrowPool"
  ): TypedContractMethod<[pid: BigNumberish], [void], "nonpayable">;

  filters: {};
}
