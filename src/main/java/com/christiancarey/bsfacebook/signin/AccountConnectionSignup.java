package com.christiancarey.bsfacebook.signin;

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.social.connect.UserProfile;

import com.christiancarey.bsfacebook.domain.User;
import com.christiancarey.bsfacebook.repositories.jpa.UserJpaRepository;

public class AccountConnectionSignup implements ConnectionSignUp {
    private UserJpaRepository userRepository;
    
    public AccountConnectionSignup(UserJpaRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public String execute(Connection<?> connection) {
        UserProfile profile = connection.fetchUserProfile();
        //TODO: random password. user won't ever login directly.
        User user = new User(
                connection.getKey().getProviderUserId(), 
                "password", 
                profile.getFirstName(), 
                profile.getLastName(), 
                profile.getEmail()
            );
        userRepository.save(user);
        return user.getUsername();
    }
}
