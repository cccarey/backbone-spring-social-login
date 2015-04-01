package com.christiancarey.bsslogin.signin;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.web.context.request.NativeWebRequest;

public class ImplicitSignInAdapter implements SignInAdapter {

    private final RequestCache requestCache;
    
    @Autowired
    private UsersConnectionRepository usersConnectionRepository;

    @Inject
    public ImplicitSignInAdapter(RequestCache requestCache) {
        this.requestCache = requestCache;
    }
    
    @Override
    public String signIn(String localUserId, Connection<?> connection, NativeWebRequest request) {
    	List<String> userIds = usersConnectionRepository.findUserIdsWithConnection(connection);
    	String userId = null;
    	if (userIds.size() == 1) {
    		userId = userIds.get(0);
    	}
    	else {
    		userId = connection.getKey().getProviderUserId();
    	}
        SignInUtils.signin(userId);
        return extractOriginalUrl(request);
    }

    private String extractOriginalUrl(NativeWebRequest request) {
        HttpServletRequest nativeReq = request.getNativeRequest(HttpServletRequest.class);
        HttpServletResponse nativeRes = request.getNativeResponse(HttpServletResponse.class);
        SavedRequest saved = requestCache.getRequest(nativeReq, nativeRes);
        if (saved == null) {
            return null;
        }
        requestCache.removeRequest(nativeReq, nativeRes);
        removeAutheticationAttributes(nativeReq.getSession(false));
        return saved.getRedirectUrl();
    }
         
    private void removeAutheticationAttributes(HttpSession session) {
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }

}
