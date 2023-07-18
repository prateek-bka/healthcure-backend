# Register & Login -->
    ##Admin -->
        # /users/register (while registering "role" should be "Admin")
        eg: {
            name:"admin's_name",
            email:"admin's_email",
            pass:"admin's_password",
            locaton:"admin's_location",
            gender:"admin's_gender",
            role:"Admin"
        }

        # /users/login (pass the email and password in req.body)
        --> it will give you the token

        # /users/
        --> it will give you all the registered users

        # /users/update/:userID
        --> you can update user information

        # /users/delete/:userID
        --> you can delete user
    
    ## User -->
        # /users/register (while registering "role" should be "User")
        eg: {
            name:"user's_name",
            email:"user's_email",
            pass:"user's_password",
            location:"user's_location",
            gender:"user's_gender",
            role:"User"
        }

        # /users/login (pass the email and password in req.body)
        --> it will give you the token

# Products Routes
    ## /products/
        --> it will give you products if you are login (user and admin both can get)

            --> pass category in query to filter data
            eg: /products?category=gainers

            --> pass sortByPrice in query to sort data by price
            eg: /products?sortByPrice=asc 

            --> you can pass category and sortByPrice at same time
            eg: /products?category=gainers&sortByPrice=desc

    ## /products/:productID
        --> to get product by id
    
    ## /products/add
        --> only Admin can add new product
    
    ## /products/update
        --> only Admin can update products
    
    ## /peoducts/delete
        --> only Admin can delete products
    

# Cart 
    ## /cart/
        --> get all products of cart (logged in user's cart data will come)
    
    ## /cart/add/:productID
        --> user should send reqired quantity and type in req.body
            --> type should be "inc" or "dec"
                --> inc for increment count of product
                --> dec for decrement count of product
                (by using type our products data base will also update)
        --> user can add product in his cart usin this route
    
    ## /cart/delete/:productID
        --> can delete items in cart
        (when user delete data from cart then products quantity in products data base will increase)