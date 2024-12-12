-include .env

build:
	forge build

local:
	forge script script/DeployFundMe.s.sol --rpc-url $(RPC_URL) --broadcast --private-key $(PRIVATE_KEY)

fundFundMeScript:
	forge script script/Interactions.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)

deploy-sepolia :
	forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url $(SEPOLIA_RPC_URL) --account sepoliaKey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv

