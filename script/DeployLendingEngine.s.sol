// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { LendingEngine } from "../src/LendingEngine.sol";
import { StealthVault, Poseidon2 } from "../src/StealthVault.sol";
import { CollateralHonkVerifier, HealthHonkVerifier } from "../test/CollateralHonkVerifier.sol";
import { RepaymentHonkVerifier } from "../test/RepaymentHonkVerifier.sol";
import { HelperConfig } from "./HelperConfig.sol";
import { LpToken } from "../src/tokens/LpToken.sol";
import { ERC20Mock } from "lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol";
import { PriceSnapShot } from "../src/PriceSnapshot.sol";

contract DeployLendingEngine is Script {
    function run() public {
        uint256 WETH_TOKEN_ID = 0;

        HelperConfig helperConfig = new HelperConfig();
        (
            address wethPriceFeedAddress,
            ,
            address weth,
            ,
            uint256 deployerKey
        ) = helperConfig.activeNetworkConfig();

        vm.startBroadcast(deployerKey);

        // --------------------
        // Core protocol deps
        // --------------------
        Poseidon2 poseidon2 = new Poseidon2();
        ERC20Mock usdt = new ERC20Mock();
        LpToken lpToken = new LpToken();

        PriceSnapShot priceSnapShot = new PriceSnapShot(
            wethPriceFeedAddress,
            poseidon2
        );

        // --------------------
        // Verifiers (real flow)
        // --------------------
        CollateralHonkVerifier collateralVerifier = new CollateralHonkVerifier();
        HealthHonkVerifier healthVerifier = new HealthHonkVerifier();
        RepaymentHonkVerifier repaymentVerifier = new RepaymentHonkVerifier();

        // --------------------
        // Stealth Vault
        // --------------------
        StealthVault stealthVault = new StealthVault(
            weth,
            16,
            poseidon2,
            address(repaymentVerifier),
            weth
        );

        // --------------------
        // Lending Engine
        // --------------------
        LendingEngine lendingEngine = new LendingEngine(
            address(priceSnapShot),
            address(usdt),
            address(lpToken),
            address(collateralVerifier),
            WETH_TOKEN_ID,
            address(stealthVault),
            16,
            poseidon2,
            address(healthVerifier)
        );

        // --------------------
        // Ownership wiring
        // --------------------
        stealthVault.transferOwnership(address(lendingEngine));
        lpToken.transferOwnership(address(lendingEngine));

        // --------------------
        // Seed protocol liquidity
        // --------------------
        usdt.mint(address(lendingEngine), 1e18 * 100_000);

        // --------------------
        // Logs
        // --------------------
        console.log("WETH address        :", weth);
        console.log("LendingEngine       :", address(lendingEngine));
        console.log("StealthVault        :", address(stealthVault));
        console.log("USDT (borrow token) :", address(usdt));

        vm.stopBroadcast();
    }
}


