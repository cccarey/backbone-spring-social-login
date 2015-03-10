package com.christiancarey.bsfacebook.domain;

import java.util.List;

import org.springframework.social.connect.Connection;

public class Connections {
    private String providerId;
    private List<Connection<?>> connections;
    
    public Connections(String providerId, List<Connection<?>> connections) {
        this.providerId = providerId;
        this.connections = connections;
    }
    
    public String getProviderId() {
        return providerId;
    }
    
    public List<Connection<?>> getConnections() {
        return connections;
    }
}
