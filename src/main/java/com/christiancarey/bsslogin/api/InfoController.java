package com.christiancarey.bsslogin.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.christiancarey.bsslogin.domain.Info;

@RestController
public class InfoController {
    @Autowired
    private Info info;
    
    @RequestMapping(value = "/api/info", method = RequestMethod.GET)
    ResponseEntity<Info> info() {
        return new ResponseEntity<>(info, HttpStatus.OK);
    }
}
