package com.ourcooking.demo.repo;

import com.ourcooking.demo.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
}
