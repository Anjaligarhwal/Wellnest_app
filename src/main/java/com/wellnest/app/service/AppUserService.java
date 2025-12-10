package com.wellnest.app.service;

import org.springframework.security.core.Authentication;

/**
 * Service used to extract the logged-in application's userId
 * from Spring Security Authentication object.
 */
public interface AppUserService {

    /**
     * Returns the database user ID (Long) for the authenticated user.
     *
     * @param authentication Spring Security authentication object
     * @return userId (Long)
     */
    Long getUserIdFromAuthentication(Authentication authentication);
}
