package com.ftn.sbnz.model.models;

import java.util.Objects;

public class Condition {
    private String type;

    public Condition() {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Condition condition = (Condition) o;
        return Objects.equals(type, condition.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type);
    }

    @Override
    public String toString() {
        return "Condition{" +
                "type='" + type + '\'' +
                '}';
    }
}
