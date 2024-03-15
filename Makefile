install:
	@echo 
	@sudo npm install -g truffle
	@npm install --save-dev prettier prettier-plugin-solidity

truffle.init:
	@echo "Initializing truffle project..."
	@truffle init

lint:
	@echo "Reformatting..."
	@yarn prettier
	@echo "Linting..."
	@solhint "contracts/**/*.sol"
