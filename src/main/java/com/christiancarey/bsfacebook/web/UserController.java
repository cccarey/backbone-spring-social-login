package com.christiancarey.bsfacebook.web;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.christiancarey.bsfacebook.domain.User;
import com.christiancarey.bsfacebook.repositories.jpa.UserJpaRepository;

@RestController
public class UserController {
	private UserJpaRepository userRepository;
	
	@Autowired
	public UserController(UserJpaRepository repository) {
		userRepository = repository;
	}
	
	@RequestMapping(value = "/api/user", method = RequestMethod.GET)
	ResponseEntity<User> user(Principal currentUser) throws Exception {
		String username = currentUser.getName();
		List<User> users = userRepository.findByUsername(username);
		if (users.size() > 1) {
			// TODO: convert to typed exception
			throw new Exception(String.format("Something has gone terribly wrong. More than one user with the username, '%s'.", username));
		}
		return new ResponseEntity<>(users.iterator().next(), HttpStatus.OK);
	}
}
