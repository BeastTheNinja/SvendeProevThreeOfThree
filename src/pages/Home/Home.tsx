import styles from "./home.module.scss";
import useFetch from "../../hooks/useFetch";
import type { Team } from "../../types/team";
import TeamSlider from "../../components/TeamSlider/TeamSlider";

function Home() {
  const { data: teams, loading, error } = useFetch<Team[]>("/api/teams");

  const getImageUrl = (url?: string) => {
    if (!url) return "/images/default-class.jpg";
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  if (loading) return <section>Loading teams...</section>;
  if (error) return <section>{error}</section>;
  if (!teams || teams.length === 0) return <section>No teams available</section>;

  const featuredTeam = teams[Math.floor(Math.random() * teams.length)];

  return (
    <section className={styles.HomePage}>
      <div className={styles.HomeHero}>
        <img
          src={getImageUrl(featuredTeam?.image?.url)}
          alt={featuredTeam?.name}
          className={styles.HomeHeroImage}
        />

        <h2 className={styles.HomeHeroTitle}>{featuredTeam?.name}</h2>
      </div>

      <div className={styles.HomeSlider}>
        <TeamSlider teams={teams} />
      </div>
    </section>
  );
}

export default Home;