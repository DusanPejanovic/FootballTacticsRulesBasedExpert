package com.ftn.sbnz.service.controllers;

import com.ftn.sbnz.service.config.auth.TokenProvider;
import com.ftn.sbnz.service.dto.JwtDto;
import com.ftn.sbnz.service.dto.SignInDto;
import com.ftn.sbnz.service.dto.SignUpDto;
import com.ftn.sbnz.service.model.User;
import com.ftn.sbnz.service.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private TokenProvider tokenService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDto data) throws Exception {
        service.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtDto> signIn(@RequestBody  SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login, data.password);
        var authUser = authenticationManager.authenticate(usernamePassword);
        var accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());
        return ResponseEntity.ok(new JwtDto(accessToken));
    }
}