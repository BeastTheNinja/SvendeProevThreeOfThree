import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Cookies } from "react-cookie";
import styles from "./ClassDetails.module.scss";
import { useNavigate } from "react-router";

import type { ClassDetailsType } from "../../types/class";
import api from "../../services/api";

function ClassDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState<ClassDetailsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const cookies = new Cookies();

    useEffect(() => {
        const token = cookies.get("accessToken");
        setIsLoggedIn(Boolean(token));
    }, []);

    useEffect(() => {
        async function fetchClass() {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const data = await api<ClassDetailsType>(`/api/teams/${id}`);
                setTeam(data);
            } catch {
                setError("Could not load class details.");
            } finally {
                setLoading(false);
            }
        }

        fetchClass();
    }, [id]);

    const handleJoinClass = () => {
        if (!team) return;

        const token = cookies.get("accessToken");

        if (!token) {
            navigate("/login", {
                state: { returnTo: `/class/${id}` },
            });
            return;
        }

        const savedSchedule = JSON.parse(
            localStorage.getItem("userSchedule") ?? "[]"
        );

        const alreadyAdded = savedSchedule.some(
            (item: { id: number }) => item.id === team.id
        );

        if (!alreadyAdded) {
            savedSchedule.push({
                id: team.id,
                name: team.name,
                day: team.day,
                time: team.time,
                trainer: team.user?.name ?? "Trainer",
                imageUrl: team.image?.url ?? "",
            });

            localStorage.setItem("userSchedule", JSON.stringify(savedSchedule));
        }

        navigate("/mySchedule");
    };

    if (loading) {
        return <section>Loading class details...</section>;
    }

    if (error) {
        return <section>{error}</section>;
    }

    if (!team) {
        return <section>No class found.</section>;
    }

    const getImageUrl = (url?: string) => {
        if (!url) return "https://via.placeholder.com/300x200?text=No+Image";
        return `${import.meta.env.VITE_API_URL}${url}`;
    };

    return (
        <section className={styles.classDetails}>
            <header className={styles.hero}>
                <img
                    src={getImageUrl(team.image?.url)}
                    alt={team.name}
                    className={styles.heroImage}
                />

                <div className={styles.heroOverlay}>
                    <h1>{team.name}</h1>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.schedule}>
                    <span>Day: {team.day}</span>
                    <span>Time: {team.time}</span>
                </div>

                <div className={styles.trainer}>
                    <img
                        src={getImageUrl(team.user?.image?.url)}
                        alt={team.user?.name}
                    />

                    <div>
                        <strong>{team.user?.name}</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                {isLoggedIn && (
                    <button type="button" onClick={handleJoinClass} className={styles.button}>
                        Join
                    </button>
                )}
            </div>
        </section>
    );
}

export default ClassDetails;