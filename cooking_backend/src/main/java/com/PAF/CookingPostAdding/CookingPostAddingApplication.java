package com.PAF.CookingPostAdding;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class CookingPostAddingApplication {

    private static final Logger log =
            LoggerFactory.getLogger(CookingPostAddingApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CookingPostAddingApplication.class, args);
    }

    // ───────────────────────────────────────────────────────────────
    // Prints one line after the application is ready
    // ───────────────────────────────────────────────────────────────
    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        String port = System.getProperty("server.port", "9090");
        log.info("▶▶▶▶▶ OK – Spring Boot started, port={}", port);
    }
}
