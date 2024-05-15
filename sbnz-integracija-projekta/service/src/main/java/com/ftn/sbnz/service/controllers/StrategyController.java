package com.ftn.sbnz.service.controllers;

import com.ftn.sbnz.model.models.Strategy;
import com.ftn.sbnz.model.models.Team;
import com.ftn.sbnz.service.dto.TeamRequest;
import com.ftn.sbnz.service.services.StrategyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class StrategyController {
	private static Logger log = LoggerFactory.getLogger(StrategyController.class);

	private final StrategyService strategyService;

	@Autowired
	public StrategyController(StrategyService strategyService) {
		this.strategyService = strategyService;
	}

	@RequestMapping(value = "/strategy", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public Strategy getStrategy(@RequestBody TeamRequest teamRequest) {
		Team yourTeam = teamRequest.getYourTeam();
		Team opponentTeam = teamRequest.getOpponentTeam();

		log.debug("Strategy request received for teams: " + yourTeam.getName() + " and " + opponentTeam.getName());

		return strategyService.evaluateStrategy(yourTeam, opponentTeam);
	}
}

