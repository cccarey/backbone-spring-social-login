package com.christiancarey.bsfacebook.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.christiancarey.bsfacebook.domain.Info;

@RestController
public class InfoController {
	@Autowired
	private Info info;
	
	@RequestMapping(method = RequestMethod.GET, value = "/info")
	ResponseEntity<Info> info() {
		return new ResponseEntity<>(info, HttpStatus.OK);
	}
}