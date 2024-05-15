package com.ftn.sbnz.model.models;

import java.util.Objects;

public class Condition {
    private ConditionType type;

    public Condition() {
        // Optionally set a default type, or leave it uninitialized (null)
        this.type = ConditionType.A; // Example default
    }

    public Condition(ConditionType type) {
        this.type = type;
    }

    public ConditionType getType() {
        return type;
    }

    public void setType(ConditionType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Condition condition = (Condition) o;
        return type == condition.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(type);
    }

    @Override
    public String toString() {
        return "Condition{" +
                "type=" + type +
                '}';
    }
}
