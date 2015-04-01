package com.christiancarey.bsslogin.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.google.api.Google;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.christiancarey.bsslogin.domain.Connections;

@RestController
@RequestMapping(value = "/api/connect")
public class RestJSONConnectionController {
    private ConnectionRepository connectionRepository;
    private ConnectionFactoryLocator connectionFactoryLocator;
    
    @Inject
    public RestJSONConnectionController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
        this.connectionFactoryLocator = connectionFactoryLocator;
        this.connectionRepository = connectionRepository;
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> connectionStatus() {
        Map<String, List<Connection<?>>> connections = connectionRepository.findAllConnections();
        List<Connections> retConnections = new ArrayList<Connections>();
        connectionFactoryLocator.registeredProviderIds().forEach((provider) -> {
            retConnections.add(new Connections(provider, connections.get(provider)));
        });
        return new ResponseEntity<>(retConnections, HttpStatus.OK);
    }
    
    @RequestMapping(value="/{providerId}", method=RequestMethod.GET)
    public ResponseEntity<?> connectionStatus(@PathVariable String providerId) {
        return new ResponseEntity<>(connectionRepository.findConnections(providerId), HttpStatus.OK);
    }
    
    @RequestMapping(value="/facebook", method=RequestMethod.GET)
    public ResponseEntity<?> facebookProfile() {
    	return new ResponseEntity<>(connectionRepository.findPrimaryConnection(Facebook.class).getApi().userOperations().getUserProfile(), HttpStatus.OK);
    }
    
    @RequestMapping(value="/google", method=RequestMethod.GET)
    public ResponseEntity<?> googleProfile() {
    	Connection<Google> connection = connectionRepository.findPrimaryConnection(Google.class);
    	if (connection.hasExpired()) {
    		connection.refresh();
    	}
		return new ResponseEntity<>(connection.getApi().plusOperations().getGoogleProfile(), HttpStatus.OK);
    }
}
