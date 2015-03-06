# backbone-spring-social-facebook

Oauth user and login control using Backbone.js and Java Spring

This app provides functions for user management and login using backbone.js & Java Spring Social using Facebook. It is intended to work as a quickstart for other applications.

UI adopted from the [backbone-webpy-openid](https://github.com/cccarey/backbone-webpy-openid) project.

> **Started:** 2015-03-03  
> **Last Update:** 2015-03-06  
> **Author:** cccarey  

# Spring Notes

Shifting from Google OAuth2 to Facebook using spring-social. See [samples](https://github.com/spring-projects/spring-social-samples)

<p><strike>Instead of using [this](http://jhasaket.blogspot.com/2014/09/securing-spring-mvc-application-using.html) tutorial ([source](https://github.com/skate056/spring-security-oauth2-google)), start with the [Spring tutorial](http://projects.spring.io/spring-security-oauth/docs/tutorial.html).</strike></p>

<p><strike><em>The link to Sparklr and Tonr in the Spring tutorial is wrong. They are the sparklr2 and tonr2 in the samples of the [spring-security-oauth source](https://github.com/spring-projects/spring-security-oauth).</em></strike></p>

# Service API

### /info - GET

Provides basic application information. Sample:

        {
            "version": "v2014228", 
            "data": {
                "count": 0, 
                "google-oauth2_state": "Pqnj8dJKcdsw4BxS1RumaliKPkY36oCx", 
                "user_id": 3, 
                "social_auth_last_login_backend": "google-oauth2", 
                "ip": "127.0.0.1", 
                "session_id": "58c539a9e3a50d5d165139399f6dbea709943196", 
                "logged_in": true
            }
        }

### /user - GET

Returns information about the logged in user

        {
            "username": "christian.carey", 
            "first_name": "Christian", 
            "last_name": "Carey", 
            "nick_name": "Chris", 
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
