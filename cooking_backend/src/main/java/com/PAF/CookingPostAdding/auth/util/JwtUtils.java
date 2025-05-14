package com.PAF.CookingPostAdding.auth.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.PAF.CookingPostAdding.auth.model.User;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;

    public String generateToken(User user) {
        byte[] secretBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Jwts.builder()
            .setSubject(user.getId())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS256, secretBytes)
            .compact();
    }

    public Jws<Claims> validateToken(String token) {
        byte[] secretBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Jwts.parser()
            .setSigningKey(secretBytes)
            .parseClaimsJws(token);
    }
}
