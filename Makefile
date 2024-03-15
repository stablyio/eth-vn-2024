-include ./.env

install:
	@echo "Installing"
	@yarn install

hardhat.init:
	@echo "Initializing hardhat project..."
	@yarn hardhat init

lint:
	@echo "Reformatting..."
	@yarn prettier
	@echo "Linting..."
	@solhint "contracts/**/*.sol"

compile:
	@echo "Compiling..."
	@yarn hardhat compile

deploy-contract:
	@if [ "$(network)" = "" ]; then \
		echo "Must provide 'network' argument"; \
		exit 1; \
	fi
	@echo "Deploying..."
	@yarn hardhat deploy --network $(network)

deploy-contract.reset:
	@if [ "$(network)" = "" ]; then \
		echo "Must provide 'network' argument"; \
		exit 1; \
	fi
	@echo "Deploying with reset..."
	@yarn hardhat deploy --reset --network $(network)

deploy-contract.local: network=localhost
deploy-contract.local: deploy-contract

deploy-contract.linea.testnet: network=linea_testnet
deploy-contract.linea.testnet: deploy-contract

run.local-node:
	@echo "Running local node..."
	@yarn hardhat node
