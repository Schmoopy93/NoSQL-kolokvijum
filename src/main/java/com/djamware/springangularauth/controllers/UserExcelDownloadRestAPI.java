package com.djamware.springangularauth.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.djamware.springangularauth.models.User;
import com.djamware.springangularauth.repositories.UserRepository;
import com.djamware.springangularauth.util.ExcelGenerator;

public class UserExcelDownloadRestAPI {
	@CrossOrigin(origins = "*")
	@RestController
	@RequestMapping("/api/auth")
	public class CustomerExcelDownloadRestAPI {
		@Autowired
		UserRepository userRepository;

		@GetMapping(value = "/users/download/users.xlsx")
		public ResponseEntity<InputStreamResource> excelUsersReport() throws IOException {
			List<User> users = (List<User>) userRepository.findAll();

			ByteArrayInputStream in = ExcelGenerator.usersToExcel(users);
			// return IOUtils.toByteArray(in);

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment; filename=customers.xlsx");

			return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));
		}
	}
}
