package com.ftn.sbnz.model.models;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Team implements Serializable {
    private String name;
    private List<Player> players;
    private TeamType teamType;

    // No-arg constructor
    public Team() {
        this.players = new ArrayList<>();
    }

    public Team(String name, TeamType teamType) {
        this.name = name;
        this.teamType = teamType;
        this.players = new ArrayList<>();
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TeamType getTeamType() {
        return teamType;
    }

    public void setTeamType(TeamType teamType) {
        this.teamType = teamType;
    }



    @Override
    public String toString() {
        return "Team{" +
                "name='" + name + '\'' +
                ", players=" + players +
                ", teamType=" + teamType +
                '}';
    }



}
