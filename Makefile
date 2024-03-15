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
