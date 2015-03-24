package com.christiancarey.bsfacebook.domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionKey;

public class Connections {
	private class SimpleConnection {
		private String displayName;
		private String imageUrl;
		private String profileUrl;
		private ConnectionKey key;
		
		SimpleConnection(ConnectionKey key, String displayName, String imageUrl, String profileUrl) {
			this.key = key;
			this.displayName = displayName;
			this.imageUrl = imageUrl;
			this.profileUrl = profileUrl;
		}
		
		public String getDisplayName() {
			return displayName;
		}

		public String getImageUrl() {
			return imageUrl;
		}

		public String getProfileUrl() {
			return profileUrl;
		}
		
		public ConnectionKey getKey() {
			return key;
		}
	}
	
    private String providerId;
    private List<SimpleConnection> connections;
    
    public Connections(String providerId, List<Connection<?>> connections) {
        this.providerId = providerId;
        List<SimpleConnection> simpleConnections = new ArrayList<SimpleConnection>(connections.size());
        connections.forEach((connection) -> {
        	simpleConnections.add(new SimpleConnection(
        			connection.getKey(),
        			connection.getDisplayName(),
        			connection.getImageUrl(),
        			connection.getProfileUrl()
    			));
        });
        this.connections = simpleConnections;
    }
    
    public String getProviderId() {
        return providerId;
    }
    
    public List<SimpleConnection> getConnections() {
        return connections;
    }
}
