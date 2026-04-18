const ref_wallet    = require('../refs/b_ref_wallet'); 

module.exports      = async (value) =>
{
    let check_wallet = ref_wallet.find(data => data.wallet_id == value);

    if(!check_wallet)
    {
        return Promise.reject("The wallet ID you entered doesn't exist.");
    } 
}