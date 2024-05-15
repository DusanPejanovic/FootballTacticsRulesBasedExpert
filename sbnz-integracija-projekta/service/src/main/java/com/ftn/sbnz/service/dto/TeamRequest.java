package com.ftn.sbnz.service.dto;

import com.ftn.sbnz.model.models.Team;

public class TeamRequest {
    private Team yourTeam;
    private Team opponentTeam;

    // Getters and setters
    public Team getYourTeam() {
        return yourTeam;
    }

    public void setYourTeam(Team yourTeam) {
        this.yourTeam = yourTeam;
    }

    public Team getOpponentTeam() {
        return opponentTeam;
    }

    public void setOpponentTeam(Team opponentTeam) {
        this.opponentTeam = opponentTeam;
    }
}