package com.christiancarey.bsslogin.api;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/connect")
public class RedirectConnectController extends ConnectController {

    @Autowired
    private Environment environment;
    
	@Inject
	public RedirectConnectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
		super(connectionFactoryLocator, connectionRepository);
	}
	
	@PostConstruct
	private void postConstruct() {
		this.setApplicationUrl(environment.getProperty("spring.social.applicationUrl"));
	}
	
	@Override
	protected RedirectView connectionStatusRedirect(String providerId, NativeWebRequest request) {
		return new RedirectView(environment.getProperty("spring.social.postConnectUrl"), true);
	}
}
