package com.symphony.platformsolutions.clicktocall.web;

import authentication.SymExtensionAppRSAAuth;
import com.symphony.platformsolutions.clicktocall.ClickToCallApp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class WebController {
    @GetMapping("/")
    public String home() {
        return "For development purposes, inject the app bundle via https://[your-pod].symphony.com/client/index.html?bundle=https://localhost:4000/bundle.json";
    }

    @GetMapping("/appToken")
    public Map<String, String> getAppToken() {
        SymExtensionAppRSAAuth appAuth = new SymExtensionAppRSAAuth(ClickToCallApp.getConfig());
        Map<String, String> map = new HashMap<>();
        map.put("token", appAuth.appAuthenticate().getAppToken());
        return map;
    }

    @GetMapping("/healthz")
    public String getHealth() {
        return "OK";
    }
}
