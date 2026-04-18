const ref_wallet    = require('../refs/b_ref_wallet_source'); 

module.exports      = async (value) =>
{
    let check_wallet = ref_wallet.find(data => data.wallet_source_id == value);

    if(!check_wallet)
    {
        return Promise.reject("The wallet source you entered doesn't exist.");
    } 
}