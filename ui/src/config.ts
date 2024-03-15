export enum Environment {
    LOCAL,
    WALLET_EXTENSION,
    PRODUCTION,
}

export interface AppConfig {
    env: Environment
    rpc: {
        local: string
        mainnet: string
    }
    wallet: {
        address: string
        privateKey: string
    }
    lendingBorrowContract: {
        address: string
    }
}

export const CurrentConfig: AppConfig = {
    env: Environment.LOCAL,
    rpc: {
        local: 'http://localhost:8545',
        mainnet: '',
    },
    wallet: {
        address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        privateKey:
            '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    },
    lendingBorrowContract: {
        address: '',
    }
}
