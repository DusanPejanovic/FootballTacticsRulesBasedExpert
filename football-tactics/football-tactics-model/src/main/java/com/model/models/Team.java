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

    public double getAverageRating() {
        if (players.isEmpty()) return 0.0;
        double totalRating = 0.0;
        for (Player player : players) {
            totalRating += (player.getPace() + player.getShooting() + player.getDribbling() + player.getPassing() + player.getDefending() + player.getPhysical()) / 6.0;
        }
        return totalRating / players.size();
    }

    @Override
    public String toString() {
        return "Team{" +
                "name='" + name + '\'' +
                ", players=" + players +
                ", teamType=" + teamType +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Team team = (Team) o;

        if (name != null ? !name.equals(team.name) : team.name != null) return false;
        if (players != null ? !players.equals(team.players) : team.players != null) return false;
        return teamType == team.teamType;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (players != null ? players.hashCode() : 0);
        result = 31 * result + (teamType != null ? teamType.hashCode() : 0);
        return result;
    }
}
