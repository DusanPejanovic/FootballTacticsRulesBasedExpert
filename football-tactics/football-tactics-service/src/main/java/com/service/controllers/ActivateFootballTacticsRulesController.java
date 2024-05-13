package com.service.controllers;

import com.service.services.ActivateFootballTacticsRulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ActivateFootballTacticsRulesController {
  private ActivateFootballTacticsRulesService service;

  @Autowired
  public ActivateFootballTacticsRulesController(ActivateFootballTacticsRulesService service) {
    this.service = service;
  }

  @GetMapping("")
  public void fireAllRules() {
    service.fireRules();
  }
}
