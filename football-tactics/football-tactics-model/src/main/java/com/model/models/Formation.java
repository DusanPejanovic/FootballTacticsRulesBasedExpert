

package com.model.models;


import java.io.Serializable;

public class Formation implements Serializable {
    private String formationType; // e.g., "4-4-2", "4-3-3"

    // No-arg constructor
    public Formation() {
    }

    public Formation(String formationType) {
        this.formationType = formationType;
    }

    public String getFormationType() {
        return formationType;
    }

    public void setFormationType(String formationType) {
        this.formationType = formationType;
    }

    @Override
    public String toString() {
        return "Formation{" +
                "formationType='" + formationType + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Formation formation = (Formation) o;

        return formationType != null ? formationType.equals(formation.formationType) : formation.formationType == null;
    }

    @Override
    public int hashCode() {
        return formationType != null ? formationType.hashCode() : 0;
    }
}
