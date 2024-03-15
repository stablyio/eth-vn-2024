install:
	@echo 
	@sudo npm install -g truffle
	@npm install -g solhint

truffle.init:
	@echo "Initializing truffle project..."
	@truffle init

lint:
	@echo "Linting..."
	@solhint "contracts/**/*.sol"
