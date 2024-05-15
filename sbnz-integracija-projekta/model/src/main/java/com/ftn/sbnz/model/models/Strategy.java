package com.ftn.sbnz.model.models;

import java.util.Objects;
public class Strategy {
    private String name;
    private String defensiveStyle;
    private int width;
    private int depth;
    private String buildUpPlay;
    private String chanceCreation;
    private int chanceCreationWidth;
    private String playersRunIntoBox;

    // Constructors, getters, and setters
    public Strategy() {}

    public Strategy(String name, String defensiveStyle, int width, int depth, String buildUpPlay, String chanceCreation, int chanceCreationWidth, String playersRunIntoBox) {
        this.name = name;
        this.defensiveStyle = defensiveStyle;
        this.width = width;
        this.depth = depth;
        this.buildUpPlay = buildUpPlay;
        this.chanceCreation = chanceCreation;
        this.chanceCreationWidth = chanceCreationWidth;
        this.playersRunIntoBox = playersRunIntoBox;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDefensiveStyle() {
        return defensiveStyle;
    }

    public void setDefensiveStyle(String defensiveStyle) {
        this.defensiveStyle = defensiveStyle;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getDepth() {
        return depth;
    }

    public void setDepth(int depth) {
        this.depth = depth;
    }

    public String getBuildUpPlay() {
        return buildUpPlay;
    }

    public void setBuildUpPlay(String buildUpPlay) {
        this.buildUpPlay = buildUpPlay;
    }

    public String getChanceCreation() {
        return chanceCreation;
    }

    public void setChanceCreation(String chanceCreation) {
        this.chanceCreation = chanceCreation;
    }

    public int getChanceCreationWidth() {
        return chanceCreationWidth;
    }

    public void setChanceCreationWidth(int chanceCreationWidth) {
        this.chanceCreationWidth = chanceCreationWidth;
    }

    public String getPlayersRunIntoBox() {
        return playersRunIntoBox;
    }

    public void setPlayersRunIntoBox(String playersRunIntoBox) {
        this.playersRunIntoBox = playersRunIntoBox;
    }
}
