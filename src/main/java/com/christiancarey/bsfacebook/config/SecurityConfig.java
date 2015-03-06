package com.christiancarey.bsfacebook.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	public void configure(WebSecurity web) throws Exception {
		web
			.ignoring()
				.antMatchers("/**/*.css", "/**/*.png", "/**/*.gif", "/**/*.jpg", "/**/*.js", "/**/*.html");
	}
	
	@Override
	public void configure (HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/api/info/**", "/favicon.ico").permitAll()
				.antMatchers("/api/**").authenticated()
			.and()
			.rememberMe()
			.and()
			.csrf().disable();
	}
}
