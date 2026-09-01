import { Link } from "react-router";
import type { Team } from "../../types/team";

type TeamCardProps = {
    team: Team;
    onClick?: () => void;
};

function TeamCard({ team }: TeamCardProps) {
    const getImageUrl = (url?: string) => {
        if (!url) return "/images/default-class.jpg";
        return `${import.meta.env.VITE_API_URL}${url}`;
    };

    const averageRating =
        team.ratings.length > 0
            ? team.ratings.reduce<number>((sum, rating) => {
                if (typeof rating === "number") {
                    return sum + rating;
                }

                return sum + Number(rating?.value ?? 0);
            }, 0) / team.ratings.length
            : 0;

    const stars = Array.from({ length: 5 }, (_, index) => {
        return index < Math.round(averageRating) ? "★" : "☆";
    }).join("");

    return (
        <Link
            to={`/class/${team.id}`}
            style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                minWidth: 180,
                marginRight: 12,
            }}
        >
            <img
                src={getImageUrl(team.image?.url)}
                alt={team.name}
                style={{
                    width: 180,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 12,
                }}
            />

            <p>{team.name}</p>

            <p style={{ margin: 0, color: "red" }}>
                {averageRating > 0 ? `${stars} ${averageRating.toFixed(1)}` : "No ratings yet"}
            </p>
        </Link>
    );
}

export default TeamCard;