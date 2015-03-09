# backbone-spring-social

Oauth user and login control using Backbone.js and Java Spring

This app provides functions for user management and login using backbone.js & Java Spring Social using Facebook and Google. It is intended to work as a quickstart for other applications.

UI adopted from the [backbone-webpy-openid](https://github.com/cccarey/backbone-webpy-openid) project.

> **Started:** 2015-03-03  
> **Last Update:** 2015-03-09  
> **Author:** cccarey  

# Notes

## application-secret.properties

This file is kept out of git as it contains the appId and secret key for Facebook and Google. You need to create this file with the following settings:

	spring.social.facebook.appId={YOUR_APP_ID}
	spring.social.facebook.appSecret={YOUR_SECRET}
	
	spring.social.google.clientId={YOUR_CLIENT_ID}
	spring.social.google.clientSecret={YOUR_SECRET}
	
# Service API

### /info - GET

Provides basic application information. Sample:

        {
            "version": "v2014228"
        }

### /user - GET

Returns information about the logged in user

        {
            "username": "christian.carey", 
            "firstName": "Christian", 
            "lastName": "Carey", 
            "nickName": "Chris", 
            "email": "....", 
            "active": true, 
            "fullname": "Christian Carey", 
            "password": "", 
            "id": 3
        }

### /user - PUT

Saves user information. See `/user - GET` for request and response payload example.

### /logout - GET

Logs the user out of the application

> See [Python Social Auth documentation](http://psa.matiasaguirre.net/) for additional
> API calls.

# Other References

The sign-in buttons come from
[this project on GitHub](https://github.com/necolas/css3-social-signin-buttons).
