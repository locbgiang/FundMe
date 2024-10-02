-include .env

build:
	forge build

deploy-local:
	forge script script/DeployFundMe.s.sol --rpc-url $(RPC_URL) --broadcast --private-key $(PRIVATE_KEY)