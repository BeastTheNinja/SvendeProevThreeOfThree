import type { Team } from "../../types/team";
import TeamCard from "../TeamCard/TeamCard";

type TeamSliderProps = {
    teams: Team[];
};

function TeamSlider({ teams }: TeamSliderProps) {
    return (
        <div
            style={{
                display: "flex",
                overflowX: "auto",
                gap: 12,
                paddingBottom: 8,
                scrollSnapType: "x mandatory",
            }}
        >
            {teams.map((team) => (
                <div key={team.id} style={{ scrollSnapAlign: "start" }}>
                    <TeamCard team={team} />
                </div>
            ))}
        </div>
    );
}

export default TeamSlider;