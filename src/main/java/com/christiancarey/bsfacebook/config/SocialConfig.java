package com.christiancarey.bsfacebook.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.web.SignInAdapter;

import com.christiancarey.bsfacebook.repositories.jpa.UserJpaRepository;
import com.christiancarey.bsfacebook.signin.AccountConnectionSignup;
import com.christiancarey.bsfacebook.signin.ImplicitSignInAdapter;

@Configuration
@EnableSocial
public class SocialConfig extends SocialConfigurerAdapter {

	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private UserJpaRepository userRepository;
	
	@Override
	public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
		JdbcUsersConnectionRepository repository = new JdbcUsersConnectionRepository(dataSource, connectionFactoryLocator, Encryptors.noOpText());
		repository.setConnectionSignUp(new AccountConnectionSignup(this.userRepository));
		return repository;
	}

	@Bean
	public SignInAdapter signInAdapter() {
		return new ImplicitSignInAdapter(new HttpSessionRequestCache());
	}

}
