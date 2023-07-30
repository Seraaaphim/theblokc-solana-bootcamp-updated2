use anchor_lang::prelude::*;

declare_id!("9PRLRtCUjqBnUi4DwyXyWVLXgUkzTLRCxbpNeSxjytTs");

#[program]
pub mod kdapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let initial_account = &mut ctx.accounts.initial_account;
        initial_account.value = 10;
        Ok(())
    }

    pub fn update_value(ctx: Context<UpdateValue>, value : u64) -> Result<()> {
        let storage_account = &mut ctx.accounts.storage_account;
        storage_account.value = value;
        Ok(())
    }
}

#[derive(Accounts)] // Account Struct
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub initial_account: Account<'info, Init>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)] // Account Struct
pub struct UpdateValue<'info> {
    #[account(mut)]
    pub storage_account: Account<'info, Init>,
}

#[account]  // Account (Solana, Filesystem)
pub struct Init{
    pub value: u64,
}