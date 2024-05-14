package com.service.services;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.model.models.Player;
import com.model.models.Team;
import com.model.models.TeamType;


@Service
public class ActivateFootballTacticsRulesService {
  private final KieContainer kieContainer;

  @Autowired
  public ActivateFootballTacticsRulesService(KieContainer kieContainer) {
    this.kieContainer = kieContainer;
  }

  public void fireRules() {
    KieSession ksession = kieContainer.newKieSession();
    Team yourTeam = new Team("Your Team", TeamType.YOUR_TEAM);
    Team opponentTeam = new Team("Opponent Team", TeamType.OPPONENT_TEAM);

    Player player1 = new Player("Player One", 80, 75, 85, 70, 65, 78, 1.80, 50000, yourTeam);
    Player player2 = new Player("Player Two", 70, 80, 60, 85, 75, 82, 1.85, 60000, yourTeam);
    Player player3 = new Player("Player Three", 60, 65, 70, 55, 60, 68, 1.75, 40000, opponentTeam);
    Player player4 = new Player("Player Four", 90, 85, 95, 80, 85, 92, 1.90, 70000, opponentTeam);

    yourTeam.addPlayer(player1);
    yourTeam.addPlayer(player2);

    opponentTeam.addPlayer(player3);
    opponentTeam.addPlayer(player4);


    ksession.insert(yourTeam);
    ksession.insert(opponentTeam);
    ksession.insert(player1);
    ksession.insert(player2);
    ksession.insert(player3);
    ksession.insert(player4);

    ksession.fireAllRules();
    ksession.dispose();
  }
}
