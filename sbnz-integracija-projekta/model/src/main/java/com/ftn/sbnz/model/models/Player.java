package com.ftn.sbnz.model.models;


import java.io.Serializable;

public class Player implements Serializable {
    private String name;
    private int pace;
    private int shooting;
    private int dribbling;
    private int passing;
    private int defending;
    private int physical;
    private double height;      // Height in meters
    private double weeklyWage;  // Weekly wage in currency units
    private Team team;

    // No-arg constructor
    public Player() {
        this.name = "";
        this.pace = 0;
        this.shooting = 0;
        this.dribbling = 0;
        this.passing = 0;
        this.defending = 0;
        this.physical = 0;
        this.height = 0;
        this.weeklyWage = 0;
        this.team = null;    }

    public Player(String name, int pace, int shooting, int dribbling, int passing, int defending, int physical, double height, double weeklyWage, Team team) {
        this.name = name;
        this.pace = pace;
        this.shooting = shooting;
        this.dribbling = dribbling;
        this.passing = passing;
        this.defending = defending;
        this.physical = physical;
        this.height = height;
        this.weeklyWage = weeklyWage;
        this.team = team;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPace() {
        return pace;
    }

    public void setPace(int pace) {
        this.pace = pace;
    }

    public int getShooting() {
        return shooting;
    }

    public void setShooting(int shooting) {
        this.shooting = shooting;
    }

    public int getDribbling() {
        return dribbling;
    }

    public void setDribbling(int dribbling) {
        this.dribbling = dribbling;
    }

    public int getPassing() {
        return passing;
    }

    public void setPassing(int passing) {
        this.passing = passing;
    }

    public int getDefending() {
        return defending;
    }

    public void setDefending(int defending) {
        this.defending = defending;
    }

    public int getPhysical() {
        return physical;
    }

    public void setPhysical(int physical) {
        this.physical = physical;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeeklyWage() {
        return weeklyWage;
    }

    public void setWeeklyWage(double weeklyWage) {
        this.weeklyWage = weeklyWage;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "Player{" +
                "name='" + name + '\'' +
                ", pace=" + pace +
                ", shooting=" + shooting +
                ", dribbling=" + dribbling +
                ", passing=" + passing +
                ", defending=" + defending +
                ", physical=" + physical +
                ", height=" + height +
                ", weeklyWage=" + weeklyWage +
                ", team=" + team.getName() +
                '}';
    }



}
