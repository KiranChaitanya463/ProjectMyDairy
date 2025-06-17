package com.saikiran.MyDairy.Service;

import com.saikiran.MyDairy.Entity.Users;
import com.saikiran.MyDairy.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public String saveUser(Users user){
        Optional<Users> existingUser = usersRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return "Username already taken";
        }
        usersRepository.save(user);
        return "Registered Successfully";
    }
     public String loginUser(Users user){
        Optional<Users> existingUser=usersRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()){
            Users oldUser=existingUser.get();
            if(user.getPassword().equals(oldUser.getPassword())){
                return "Login Successful";
            }
            else{
                return "Invalid Password";
            }
        }
        else{
            return "No User found! Please Register :)";
        }
     }
    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
