module.exports = async (value, data) =>
{
    if(data.req.body.confirm_password != value)
    {
        return Promise.reject("The password and confirm password didn't match.");
    }
}