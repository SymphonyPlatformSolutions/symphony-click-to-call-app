package com.symphony.platformsolutions.clicktocall;

import configuration.SymConfig;
import configuration.SymConfigLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.net.URL;

@SpringBootApplication
public class ClickToCallApp {
    private static SymConfig config;

    public static void main(String [] args) {
        SpringApplication.run(ClickToCallApp.class, args);
    }

    public ClickToCallApp() {
        URL url = getClass().getClassLoader().getResource("config.json");
        if (url == null)
            throw new RuntimeException("Bad URL");
        config = SymConfigLoader.loadFromFile(url.getPath());
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/bundle.json").allowedOrigins("*");
            }
        };
    }

    public static SymConfig getConfig() {
        return config;
    }
}
