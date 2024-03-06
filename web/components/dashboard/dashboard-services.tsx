// @ts-ignore
import {
  Connection,
  PublicKey,
  Keypair,
  StakeProgram,
  LAMPORTS_PER_SOL,
  Authorized,
} from "@solana/web3.js";
// @ts-ignore
import walletSecret from "./wallet.json";
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const wallet = Keypair.fromSecretKey(new Uint8Array(walletSecret));
const stakeAccount = Keypair.generate();
const validatorVoteAccount = new PublicKey(
  "FwR3PbjS5iyqzLiLugrBqKSa5EKZ4vK9SKs7eQXtT59f"
);

export async function fundAccount(
  accountToFund: Keypair,
  lamports = LAMPORTS_PER_SOL
) {
  const {
    blockhash,
    lastValidBlockHeight,
  } = await connection.getLatestBlockhash();
  try {
    const signature = await connection.requestAirdrop(
      accountToFund.publicKey,
      lamports
    );
    const result = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "finalized"
    );
    if (result.value.err) {
      throw new Error(`Failed to confirm airdrop: ${result.value.err}`);
    }
    console.log("Wallet funded", signature);
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function createStakeAccount({
  wallet,
  stakeAccount,
  lamports,
}: {
  wallet: Keypair;
  stakeAccount: Keypair;
  lamports?: number;
}) {
  const transaction = StakeProgram.createAccount({
    fromPubkey: wallet.publicKey,
    stakePubkey: stakeAccount.publicKey,
    authorized: new Authorized(wallet.publicKey, wallet.publicKey),
    lamports: lamports ?? LAMPORTS_PER_SOL,
  });
  try {
    const {
      blockhash,
      lastValidBlockHeight,
    } = await connection.getLatestBlockhash();
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.sign(wallet, stakeAccount);
    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );
    const result = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "finalized"
    );
    if (result.value.err) {
      throw new Error(`Failed to confirm airdrop: ${result.value.err}`);
    }
    console.log("Stake Account created", signature);
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function delegateStakeAccount({
  stakeAccount,
  validatorVoteAccount,
  authorized,
}: {
  stakeAccount: Keypair;
  validatorVoteAccount: PublicKey;
  authorized: Keypair;
}) {
  const transaction = StakeProgram.delegate({
    stakePubkey: stakeAccount.publicKey,
    authorizedPubkey: authorized.publicKey,
    votePubkey: validatorVoteAccount,
  });
  try {
    const {
      blockhash,
      lastValidBlockHeight,
    } = await connection.getLatestBlockhash();
    transaction.feePayer = authorized.publicKey;
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.sign(authorized);
    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );
    const result = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "finalized"
    );
    if (result.value.err) {
      throw new Error(`Failed to confirm airdrop: ${result.value.err}`);
    }
    console.log("Stake Account delegated to vote account", signature);
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function getStakeAccountInfo(stakeAccount: PublicKey) {
  try {
    const info = await connection.getStakeActivation(stakeAccount);
    console.log(`Stake account status: ${info.state}`);
  } catch (error) {
    console.error(error);
  }
  return;
}
export async function stakeAmount(amountToStake: number) {
  try {
    console.log("connectionis,,", connection);
    // Fund user's account
    // await fundAccount(wallet);

    // Create a new stake account
    await createStakeAccount({ wallet, stakeAccount });

    // Delegate the stake account to a validator vote account
    await delegateStakeAccount({
      stakeAccount,
      validatorVoteAccount,
      authorized: wallet,
    });

    // Optionally, fetch and display stake account information
    await getStakeAccountInfo(stakeAccount.publicKey);

    console.log("Staking process completed successfully.");
  } catch (error) {
    console.error("Error while staking:", error);
  }
}
// https://www.quicknode.com/guides/solana-development/getting-started/how-to-stake-sol
