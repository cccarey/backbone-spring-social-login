package com.christiancarey.bsfacebook.web;

import java.util.List;

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
		User user = new User(profile.getEmail(), "password", profile.getFirstName(), profile.getLastName());
		userRepository.save(user);
		SignInUtils.signin(profile.getEmail());
		return new RedirectView("/", true);
	}
	
	// TODO: use security principal
	@RequestMapping(value = "/api/user", method = RequestMethod.GET)
	ResponseEntity<User> user(WebRequest request) throws Exception {
		String username = providerSignInUtils.getConnectionFromSession(request).fetchUserProfile().getEmail();
		List<User> users = userRepository.findByUsername(username);
		if (users.size() > 1) {
			// TODO: convert to typed exception
			throw new Exception(String.format("Something has gone terribly wrong. More than one user with the username, '%s'.", username));
		}
		return new ResponseEntity<>(users.iterator().next(), HttpStatus.OK);
	}
}
