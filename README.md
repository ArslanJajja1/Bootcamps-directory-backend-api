# Bootcamps-Directory-Api

I have created the bootcamps-directory-backend-api.

## Deployed links :

## Postman deployed link 👇🏻

https://documenter.getpostman.com/view/14040172/VUquNGDU

![postman api Image](/public/images/postman1.png)

![postman api Image](/public/images/postman2.png)



## Documentation/api deployed heroku link 👇🏻

https://bootcamps-directory-web-api-70edc697e0cb.herokuapp.com/

![api documentation Image](/public/images/api.png)

## Bootcamps

### List all bootcamps in the database

-   Pagination
-   Select specific fields in result
-   Limit number of results
-   Filter by fields
-   Search bootcamps by radius from zipcode
-   Use a geocoder to get exact location and coords from a single address field

### Get single bootcamp

### Create new bootcamp

-   Authenticated users only
-   Must have the role "publisher" or "admin"
-   Only one bootcamp per publisher (admins can create more)
-   Field validation via Mongoose

### Upload a photo for bootcamp

-   Owner only
-   Photo will be uploaded to local filesystem

### Update bootcamps

-   Owner only
-   Validation on update
-   Delete Bootcamp
-   Owner only
-   Calculate the average cost of all courses for a bootcamp
-   Calculate the average rating from the reviews for a bootcamp

## Courses

### List all courses for bootcamp

### List all courses in general

-   Pagination, filtering, etc

### Get single course

### Create new course

-   Authenticated users only
-   Must have the role "publisher" or "admin"
-   Only the owner or an admin can create a course for a bootcamp
-   Publishers can create multiple courses

### Update course

-   Owner only

### Delete course

-   Owner only

## Reviews

### List all reviews for a bootcamp

### List all reviews in general

-   Pagination, filtering, etc

### Get a single review

### Create a review

-   Authenticated users only
-   Must have the role "user" or "admin" (no publishers)

### Update review

-   Owner only

### Delete review

-   Owner only

## Users & Authentication

-   Authentication will be ton using JWT/cookies
-   JWT and cookie should expire in 30 days

### User registration

-   Register as a "user" or "publisher"
-   Once registered, a token will be sent along with a cookie (token = xxx)
-   Passwords must be hashed

## User login

-   User can login with email and password
-   Plain text password will compare with stored hashed password
-   Once logged in, a token will be sent along with a cookie (token = xxx)

### User logout

-   Cookie will be sent to set token = none

### Get user

-   Route to get the currently logged in user (via token)
-   Password reset (lost password)

### User can request to reset password

-   A hashed token will be emailed to the users registered email address
-   A put request can be made to the generated url to reset password
-   The token will expire after 10 minutes

### Update user info

-   Authenticated user only
-   Separate route to update password

### User CRUD

-   Admin only
-   Users can only be made admin by updating the database field manually

## Security

-   Encrypt passwords and reset tokens
-   Prevent NoSQL injections using express-mongo-sanitize npm package
-   Add headers for security using helmet npm package
-   Prevent cross site scripting - XSS npm package
-   Add a rate limit for requests of 100 requests per 10 minutes
-   Protected against http param polution using hpp package
-   Used cors to make API public

## Documentation

-   Used Postman to create documentation
-   Used docgen package to create HTML files from Postman
-   Added html file as the / route for the api index page for documentation

## Author

[@ArslanJajja](https://www.github.com/arslanjajja1)
