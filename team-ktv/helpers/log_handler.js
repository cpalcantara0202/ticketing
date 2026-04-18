const clc            = require("cli-color");
const system_config  = require("../system_config");

global.clc      = clc;
global.logger   = (message, development_only = true) =>
{
    if(system_config.hide_logs == false)
    {
        if(process.env.development && development_only)
        {
            console.log(message);
        }
        else
        {
            console.log(message);
        }
    }
}