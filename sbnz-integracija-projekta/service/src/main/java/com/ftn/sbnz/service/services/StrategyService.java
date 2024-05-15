package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.events.Item;
import com.ftn.sbnz.model.models.Player;
import com.ftn.sbnz.model.models.Strategy;
import com.ftn.sbnz.model.models.Team;
import com.ftn.sbnz.model.models.TeamType;
import org.drools.core.ClassObjectFilter;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StrategyService {

	private static Logger log = LoggerFactory.getLogger(StrategyService.class);

	private final KieContainer kieContainer;

	@Autowired
	public StrategyService(KieContainer kieContainer) {
		log.info("Initializing a new KIE session.");
		this.kieContainer = kieContainer;
	}

	public Strategy evaluateStrategy(Team yourTeam, Team opponentTeam) {
		KieSession ksession = kieContainer.newKieSession();

		// Insert facts
		ksession.insert(yourTeam);
		ksession.insert(opponentTeam);

		// Fire rules
		ksession.fireAllRules();

		// Retrieve the strategy fact
		Strategy strategy = (Strategy) ksession.getObjects(new ClassObjectFilter(Strategy.class)).iterator().next();

		// Dispose the session to free resources
		ksession.dispose();

		return strategy;
	}
}
