package com.christiancarey.bsfacebook.web;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@RestController
@RequestMapping(value = "/api/connect")
public class ConnectionsController {
	private ConnectionRepository connectionRepository;
	
	@Inject
	public ConnectionsController(ConnectionRepository connectionRepository) {
		this.connectionRepository = connectionRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public void connectionStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		new MappingJackson2JsonView().render(connectionRepository.findAllConnections(), request, response);
	}
	
	@RequestMapping(value="/{providerId}", method=RequestMethod.GET)
	public ResponseEntity<?> connectionStatus(@PathVariable String providerId) {
		return new ResponseEntity<>(connectionRepository.findConnections(providerId), HttpStatus.OK);
	}
}
