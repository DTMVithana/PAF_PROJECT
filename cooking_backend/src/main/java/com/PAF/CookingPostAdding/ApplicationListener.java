package com.PAF.CookingPostAdding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

public class ApplicationListener {
        public static void main(String[] args) {
        SpringApplication.run(ApplicationListener.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        System.out.println("Backend connected successfully");
    }
}
