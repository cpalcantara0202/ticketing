# Geer BLZ Online Ticketing Backend

## Setting up project for Development

1. Create project `.env` file into the project root directory. You can use the following parameters in your `.env` file as a default.
```
# configurations
development_mode=true
backend_port=4001
mongo_db_connection_string="mongodb+srv://developer:water123@testing.qtetx.mongodb.net/dev_ticketing"
telegram_channel="-808854602"
telegram_token="5940612440:AAGqWjkK3XyLYcuFXwvO7zu1zZxplTLEbVk"
base_url="http://localhost:4000"
facebook_app_id="240285215609734"
facebook_secret="d238b84c888335771b417a55061e5c55"
frontend_url="http://localhost:9000"
sql_clone=0

# email credentials
mail_host="smtp.gmail.com"
mail_user="geertestingsample@gmail.com"
mail_pass="gaazpjynngpfsxxl"
mail_from="geertestingsample@gmail.com"
mail_name="gmail.com"
mail_port=587
mail_secure=0
```
2. Make sure `node` is intalled with atleast Version 12. Once you know it's properly installed run `npm install`.
3. Install `nodemon` globally if you haven't installed. You can install using this command `npm install -g nodemon`.
4. Run the project by going into the project root directory and running the command `nodemon`.
