package com.ftn.sbnz.service;

import com.ftn.sbnz.model.models.Player;
import com.ftn.sbnz.model.models.Team;
import com.ftn.sbnz.model.models.TeamType;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.sbnz.model.events.Item;


@Service
public class SampleAppService {

	private static Logger log = LoggerFactory.getLogger(SampleAppService.class);

	private final KieContainer kieContainer;

	@Autowired
	public SampleAppService(KieContainer kieContainer) {
		log.info("Initialising a new example session.");
		this.kieContainer = kieContainer;
	}

	public Item getClassifiedItem(Item i) {
		KieSession ksession = kieContainer.newKieSession();
		Team yourTeam = new Team("Your Team", TeamType.YOUR_TEAM);
		Team opponentTeam = new Team("Opponent Team", TeamType.OPPONENT_TEAM);

		Player player1 = new Player("Player One", 80, 75, 85, 70, 65, 78, 1.80, 50000, yourTeam);
		Player player2 = new Player("Player Two", 70, 80, 60, 85, 75, 82, 1.85, 60000, yourTeam);
		Player player3 = new Player("Player Three", 90, 65, 90, 95, 90, 98, 1.75, 40000, opponentTeam);
		Player player4 = new Player("Player Four", 90, 95, 95, 90, 85, 92, 1.90, 70000, opponentTeam);

		yourTeam.addPlayer(player1);
		yourTeam.addPlayer(player2);

		opponentTeam.addPlayer(player3);
		opponentTeam.addPlayer(player4);


		ksession.insert(yourTeam);
		ksession.insert(opponentTeam);

		ksession.fireAllRules();
		ksession.dispose();
		return i;
	}
}
