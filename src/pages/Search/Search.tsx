import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "./Search.module.scss";

import TeamSlider from "../../components/TeamSlider/TeamSlider";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/useSearch";
import useSort from "../../hooks/useSort";
import type { Team } from "../../types/team";

function Search() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: teams, loading, error } = useFetch<Team[]>("/api/teams");

    const searchParam = new URLSearchParams(location.search).get("q") ?? "";

    const { search, setSearch, filteredItems } = useSearch<Team>(
        teams ?? [],
        ["name", "day", "time", "description", "user.name"]
    );

    const { sortedItems, sortBy } = useSort(filteredItems, "name");

    useEffect(() => {
        setSearch(searchParam);
    }, [searchParam, setSearch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (search.trim()) {
            params.set("q", search);
        } else {
            params.delete("q");
        }

        const nextSearch = params.toString();
        const nextUrl = nextSearch ? `?${nextSearch}` : "";

        if (nextUrl !== location.search) {
            navigate({ search: nextUrl }, { replace: true });
        }
    }, [search, location.search, navigate]);

    const popularTeams = teams?.slice(0, 6) ?? [];

    const popularTrainers = teams
        ? Array.from(
            new Map(
                teams.map((team) => [
                    team.user.id ?? team.user.name,
                    {
                        id: team.user.id ?? team.user.name,
                        name: team.user.name,
                        image: team.user.image,
                        className: team.name,
                    },
                ])
            ).values()
        )
        : [];

    const hasSearch = search.trim().length > 0;

    if (loading) {
        return <section>Loading classes...</section>;
    }

    if (error) {
        return <section>{error}</section>;
    }

    const getImageUrl = (url?: string) => {
        if (!url) {
            return "https://via.placeholder.com/200x200?text=Trainer";
        }

        return `${import.meta.env.VITE_API_URL}${url}`;
    };

    return (
        <section className={styles.searchPage}>
            <div className={styles.searchBarWrap}>
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search classes, coach, day or description..."
                    className={styles.searchInput}
                />
            </div>

            {!hasSearch && (
                <>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Popular classes</h2>
                        </div>

                        <TeamSlider teams={popularTeams} />
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Popular trainers</h2>
                        </div>

                        <div className={styles.trainerList}>
                            {popularTrainers.map((trainer) => (
                                <article key={trainer.id} className={styles.trainerCard}>
                                    <img
                                        src={getImageUrl(trainer.image?.url)}
                                        alt={trainer.name}
                                        className={styles.trainerImage}
                                    />

                                    <div className={styles.trainerContent}>
                                        <strong>{trainer.name}</strong>
                                        <p>{trainer.className}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {hasSearch && (
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Results</h2>

                        <label className={styles.sortLabel}>
                            Sort by:
                            <select
                                value="name"
                                onChange={(event) => sortBy(event.target.value as keyof Team)}
                                className={styles.sortSelect}
                            >
                                <option value="name">Name</option>
                                <option value="day">Day</option>
                                <option value="time">Time</option>
                            </select>
                        </label>
                    </div>

                    {sortedItems.length === 0 ? (
                        <p className={styles.noResults}>
                            Your search did not give any results. Try to search for something else.
                        </p>
                    ) : (
                        <ul className={styles.resultList}>
                            {sortedItems.map((team) => (
                                <li key={team.id} className={styles.resultItem}>
                                    <Link to={`/class/${team.id}`} className={styles.resultLink}>
                                        <strong>{team.name}</strong>
                                        <span>{team.day}</span>
                                        <span>{team.time}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </section>
    );
}

export default Search;