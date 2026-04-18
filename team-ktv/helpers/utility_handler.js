require('dotenv').config();
global.global_config        = process.env;
global.system_config        = require('../system_config');
const Controller            = require('../controllers/Controller');
global.controller           = new Controller();

global.getConfig = () =>
{
    let config = process.env;
    return config;
}
global.getExtension = (filename) => {
    return filename.split('.').filter(Boolean).slice(1).join('.');
}
global.getRef = (key, find = null, value = null) => 
{
    let reference = require(`../refs/b_ref_${key}.js`);

    if(!find)
    {
        return reference;
    }
    else
    {
        return reference.find(data => data[find] == value);
    }
}

global.pad = (num, size) =>
{
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

global.makeId = (length) =>
{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length)
    {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
}