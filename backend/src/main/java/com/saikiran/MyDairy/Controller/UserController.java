package com.saikiran.MyDairy.Controller;

import com.saikiran.MyDairy.Entity.Users;
import com.saikiran.MyDairy.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/login")
    public String userLogin(@RequestBody Users user){
         return usersService.loginUser(user);
    }

    @PostMapping("/register")
    public String userRegister(@RequestBody Users newuser){
        return usersService.saveUser(newuser);
    }

    @GetMapping("/{username}")
    public Users getUserByUsername(@PathVariable String username) {
        return usersService.getUserByUsername(username);
    }
}
