package com.christiancarey.bsfacebook.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.support.ConnectionFactoryRegistry;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.google.connect.GoogleConnectionFactory;

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
	
	@Autowired
	private Environment environment;
	
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

	@Bean
	public ConnectionFactoryLocator connectionFactoryLocator() {
		ConnectionFactoryRegistry registry = new ConnectionFactoryRegistry();
		registry.addConnectionFactory(new FacebookConnectionFactory(
				environment.getProperty("spring.social.facebook.appId"), 
				environment.getProperty("spring.social.facebook.appSecret")
				));
		registry.addConnectionFactory(new GoogleConnectionFactory(
				environment.getProperty("spring.social.google.clientId"),
				environment.getProperty("spring.social.google.clientSecret")
				));
		return registry;
	}
}
