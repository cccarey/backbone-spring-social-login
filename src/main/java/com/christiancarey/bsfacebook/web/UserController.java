package com.christiancarey.bsfacebook.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class User {
	@RequestMapping(value = "/user", method = RequestMethod.GET)
	ResponseEntity<String> user() {
		return new ResponseEntity<>("junk", HttpStatus.OK);
	}
}
