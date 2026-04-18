/* import libraries */
const chai                  = require('chai');
const chaiHttp              = require('chai-http');
const app                   = require('../index'); 
const system_config         = require('../system_config');
chai.use(chaiHttp);
const expect                = chai.expect;

/* create a random integer for account creations */
const random_int            = Math.floor(Math.random() * 100000000000);

/* declare global to access on all test files */
global.chai                 = chai;
global.app                  = app;
global.expect               = expect;
system_config.hide_logs     = true;

/* initialize credentials for registration */
global.auth_credentials     =
{
    first_name:             			`FN ${random_int}`,
    middle_nname:           			`MN ${random_int}`,
    last_name:              			`LN ${random_int}`,
    email:                  			`unit_test_${random_int}@gmail.com`,
    password:               			`water123`,
    username:               			`unit_test_${random_int}`,
    contact_number:         			`09171587078`,
};

//front
global.auth_credentials1     =
{
    first_name:             			`FN_F ${random_int}`,
    middle_nname:           			`MN_F ${random_int}`,
    last_name:              			`LN_F ${random_int}`,
    email:                  			`unit_test_F${random_int}@gmail.com`,
    password:               			`water123`,
    username:               			`unit_test_F${random_int}`,
    contact_number:         			`09171587078`,
};

global.event_info     		=
{
    newly_added_event_id:   			null,
    event_name:             			`BLZ`,
    event_date_start:       			`2023/10/24`,
    event_date_end:         			`2023/10/25`,
    event_location:         			`Philippines`,
    event_cover:            			`http://placeimg.com/640/${random_int}`,
    event_description:      			`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    event_map:              			`http://placeimg.com/640/${random_int},`
};

global.ticket_info			=
{
    event_id:	               			null,
	newly_added_ticket_id:				null,
    ticket_name:               			`VIP DAY 1`,
    ticket_price:              			`100`,
    ticket_date_start:         			`2023/10/22`,
    ticket_date_end:           			`2023/10/25`,
    ticket_image:              			`http://placeimg.com/640/${random_int}`,
};

global.ticket_serial_info 	= 
{
	newly_added_ticket_serial_ids:	 	null,// Initialize the array to store ticket serial IDs
};

global.item_info     		=
{
    newly_added_item_id:   				null,
    item_name:             				`VIP DAY 1 & 2`,
    item_description:       			`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    item_price:         				`1000`,
	item_image:            				`http://placeimg.com/640/${random_int}`,
};

global.order_info = 
{
	newly_added_order_id:				null,
	referencenumber:					`123456`,
	payment_proof_image:		  		`http://placeimg.com/640/${random_int}`,
};

global.promo_code_info = 
{
	newly_added_promocode_id:				null,
	first_name:             			`FN ${random_int}`,
    middle_nname:           			`MN ${random_int}`,
    last_name:              			`LN ${random_int}`,
    screen_name:              			`SN ${random_int}`,
    contact_number:         			`09171587078`,
	email:                  			`unit_test_artist${random_int}@gmail.com`,
	promo_code:							`PC ${random_int}`,
	contact_number:         			`09171587078`,
};
