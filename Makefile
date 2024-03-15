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

deploy:
	@if [ "$(network)" = "" ]; then \
		echo "Must provide 'network' argument"; \
		exit 1; \
	fi
	@echo "Deploying..."
	@yarn hardhat ignition deploy ${IGNITION_PATH} --network $(network)

deploy.reset:
	@if [ "$(network)" = "" ]; then \
		echo "Must provide 'network' argument"; \
		exit 1; \
	fi
	@echo "Deploying with reset..."
	@yarn hardhat ignition deploy --reset ${IGNITION_PATH} --network $(network)

deploy.local: network=localhost
deploy.local: deploy

run.local-node:
	@echo "Running local node..."
	@yarn hardhat node
