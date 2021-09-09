# Simple-Inventory-App
A one-page app to handle simple inventory management

The purpose of this app is to keep track of my brother's beer inventory after Brew Days. To add a beer to the inventory, fill out the mock form under Add an item! and click the Add button. This will add the item to the page as well as the db.json file. After it is added, you can update the inventory quantity by entering a negative number to remove from the inventory, or entering a positive number to add to the inventory. To remove a beer from the inventory, click the Remove From Inventory button. This will delete the beer from the page and the database.

For this app to work, the use of JSON Server is required. 
If you do not have JSON Server installed, execute the following command in your terminal, if you do, skip this step and start the server:

npm install -g json-server

After it is installed, navigate to the Simple-Inventory-App directory and start the server with the following command:

json-server --watch db.json

Now, all db.json information will be available and any changes made to the inventory via the app will be saved there.

To exit the json server, enter ctrl + c into the terminal.
