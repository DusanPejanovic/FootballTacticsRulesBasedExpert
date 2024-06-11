package com.ftn.sbnz.service.controllers;

import com.ftn.sbnz.model.models.Strategy;
import com.ftn.sbnz.model.models.Team;
import com.ftn.sbnz.service.dto.TeamRequest;
import com.ftn.sbnz.service.services.StrategyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tactics")

public class StrategyController {
	private static Logger log = LoggerFactory.getLogger(StrategyController.class);

	private final StrategyService strategyService;

	@Autowired
	public StrategyController(StrategyService strategyService) {
		this.strategyService = strategyService;
	}

	@RequestMapping(value = "/strategy", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public String getStrategy(@RequestBody TeamRequest teamRequest) {
		Team yourTeam = teamRequest.getYourTeam();
		Team opponentTeam = teamRequest.getOpponentTeam();

		log.debug("Strategy request received for teams: " + yourTeam.getName() + " and " + opponentTeam.getName());


		Strategy strategy =  strategyService.evaluateStrategy(yourTeam, opponentTeam);
		String rez = "";
		rez += "Name: "  + strategy.getName() + ';' +
				"DefensiveStyle: " + strategy.getDefensiveStyle() +  ';' +
				"Defence Width: " + strategy.getWidth() +  ';' +
				"Depth: " + strategy.getDepth() +  ';' +
				"Build up play: " + strategy.getBuildUpPlay() +  ';' +
				"Chance creation: " + strategy.getChanceCreation() +  ';' +
				"Offence width: " + strategy.getChanceCreationWidth() +  ';' +
				"Payers Run Into Box: " + strategy.getPlayersRunIntoBox();
		return rez;

	}
}

