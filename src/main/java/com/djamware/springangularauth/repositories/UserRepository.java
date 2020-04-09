package com.djamware.springangularauth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.djamware.springangularauth.models.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findByEmail(String email);
}