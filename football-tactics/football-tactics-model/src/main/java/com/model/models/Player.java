import java.io.Serializable;

public class Player implements Serializable {
    private String name;
    private int pace;
    private int shooting;
    private int dribbling;
    private int passing;
    private int defending;
    private int physical;

    // No-arg constructor
    public Player() {
    }

    public Player(String name, int pace, int shooting, int dribbling, int passing, int defending, int physical) {
        this.name = name;
        this.pace = pace;
        this.shooting = shooting;
        this.dribbling = dribbling;
        this.passing = passing;
        this.defending = defending;
        this.physical = physical;
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
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Player player = (Player) o;

        if (pace != player.pace) return false;
        if (shooting != player.shooting) return false;
        if (dribbling != player.dribbling) return false;
        if (passing != player.passing) return false;
        if (defending != player.defending) return false;
        if (physical != player.physical) return false;
        return name != null ? name.equals(player.name) : player.name == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + pace;
        result = 31 * result + shooting;
        result = 31 * result + dribbling;
        result = 31 * result + passing;
        result = 31 * result + defending;
        result = 31 * result + physical;
        return result;
    }
}
