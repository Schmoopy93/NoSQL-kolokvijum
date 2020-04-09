package com.djamware.springangularauth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.djamware.springangularauth.services.CustomUserDetailsService;
@CrossOrigin(origins = "*")
public class UserExcelImport {
	
	@Autowired
	CustomUserDetailsService userService;
	
	@PostMapping("/api/auth/users/importusers")
	public ResponseEntity<String> importBooks(@RequestBody String excelFilePath) {
		userService.readUsersFromExcelFile(excelFilePath);
		return new ResponseEntity<String>("Imported", HttpStatus.OK);
	

}
}