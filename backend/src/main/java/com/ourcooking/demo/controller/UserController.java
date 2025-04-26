package com.ourcooking.demo.controller;

import com.ourcooking.demo.dto.UserDTO;
import com.ourcooking.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getUser")
    public List<UserDTO> getUser(){
        return userService.getAllUsers();
    }

    @PostMapping("/saveUser")
    public UserDTO saveUser(@RequestBody UserDTO userDTO){
        return userService.saveUser(userDTO);
    }

    @PutMapping("/updateUser")
    public UserDTO updateUser(@RequestBody UserDTO userDTO){
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("/deleteUser")
    public boolean deleteUser(@RequestBody UserDTO userDTO){
        return userService.deleteUser(userDTO);
    }
}
