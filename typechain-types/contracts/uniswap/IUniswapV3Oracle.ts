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

export interface IUniswapV3OracleInterface extends Interface {
  getFunction(
    nameOrSignature: "getNFTAmounts" | "getTWAPQuoteNft"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getNFTAmounts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTWAPQuoteNft",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getNFTAmounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTWAPQuoteNft",
    data: BytesLike
  ): Result;
}

export interface IUniswapV3Oracle extends BaseContract {
  connect(runner?: ContractRunner | null): IUniswapV3Oracle;
  waitForDeployment(): Promise<this>;

  interface: IUniswapV3OracleInterface;

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

  getNFTAmounts: TypedContractMethod<
    [_tokenId: BigNumberish],
    [
      [string, string, bigint, bigint, bigint] & {
        _token0: string;
        _token1: string;
        _fee: bigint;
        _amount0: bigint;
        _amount1: bigint;
      }
    ],
    "view"
  >;

  getTWAPQuoteNft: TypedContractMethod<
    [_tokenId: BigNumberish, _quoteToken: AddressLike],
    [[bigint, bigint] & { _quoteAmount: bigint; _gasEstimate: bigint }],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getNFTAmounts"
  ): TypedContractMethod<
    [_tokenId: BigNumberish],
    [
      [string, string, bigint, bigint, bigint] & {
        _token0: string;
        _token1: string;
        _fee: bigint;
        _amount0: bigint;
        _amount1: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTWAPQuoteNft"
  ): TypedContractMethod<
    [_tokenId: BigNumberish, _quoteToken: AddressLike],
    [[bigint, bigint] & { _quoteAmount: bigint; _gasEstimate: bigint }],
    "view"
  >;

  filters: {};
}
