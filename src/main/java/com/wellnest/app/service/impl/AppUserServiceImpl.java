package com.wellnest.app.service.impl;

import com.wellnest.app.model.User;
import com.wellnest.app.repository.UserRepository;
import com.wellnest.app.service.AppUserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class AppUserServiceImpl implements AppUserService {

    private final UserRepository userRepository;

    public AppUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Resolve the application user id (Long) from Spring Security Authentication.
     * Assumes Authentication.getName() returns user's email (as in your CustomUserDetailsService).
     */
    @Override
    public Long getUserIdFromAuthentication(Authentication authentication) {
        Assert.notNull(authentication, "Authentication must not be null");
        String principalName = authentication.getName();
        if (principalName == null || principalName.isBlank()) {
            throw new IllegalStateException("No authenticated principal found");
        }

        // userRepository.findByEmail(...) exists in your project
        User user = userRepository.findByEmail(principalName)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + principalName));

        return user.getId();
    }
}
