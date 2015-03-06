package com.christiancarey.bsfacebook.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.UserProfile;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.view.RedirectView;

import com.christiancarey.bsfacebook.domain.User;
import com.christiancarey.bsfacebook.repositories.jpa.UserJpaRepository;
import com.christiancarey.bsfacebook.signin.SignInUtils;

@RestController
public class UserController {
	private final ProviderSignInUtils providerSignInUtils;
	private UserJpaRepository userRepository;
	
	@Autowired
	public UserController(UserJpaRepository repository) {
		providerSignInUtils = new ProviderSignInUtils();
		userRepository = repository;
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public RedirectView signup(WebRequest request) {
		// TODO: handle errors
		Connection<?> connection = providerSignInUtils.getConnectionFromSession(request);
		UserProfile profile = connection.fetchUserProfile();
		User user = new User(profile.getUsername(), "password", profile.getFirstName(), profile.getLastName());
		userRepository.save(user);
		SignInUtils.signin(profile.getUsername());
		return new RedirectView("/", true);
	}
	
	@RequestMapping(value = "/api/user", method = RequestMethod.GET)
	ResponseEntity<String> user() {
		return new ResponseEntity<>("junk", HttpStatus.OK);
	}
}
