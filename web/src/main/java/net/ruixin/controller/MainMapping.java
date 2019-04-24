package net.ruixin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainMapping {
    @RequestMapping("/password")
    public String password() {
        return "/plat/main/password";
    }

    @RequestMapping("/center")
    public String center() {
        return "/plat/main/center";
    }

    @RequestMapping("/center2")
    public String center2() {
        return "/plat/main/center2";
    }
}
