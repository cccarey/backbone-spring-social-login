package com.christiancarey.bsfacebook.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class Info {
    @JsonProperty("version")
    @Value("${application.version}")
    private String version;
    
    public Info() {
    }
    
    public String getVersion() {
        return version;
    }
}
