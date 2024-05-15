package com.ftn.sbnz.model.models;

import java.util.Objects;

public class Condition {
    private String type;

    public Condition() {
        this.type = "";
    }

    public Condition(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }



    @Override
    public String toString() {
        return "Condition{" +
                "type='" + type + '\'' +
                '}';
    }
}
