import { useEffect, useState } from "react";
import type { ScheduleItem } from "../../types/schedule";

import styles from "./Schedule.module.scss";

function Schedule() {
  const [classes, setClasses] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const schedule = JSON.parse(localStorage.getItem("userSchedule") ?? "[]");
    setClasses(schedule);
  }, []);

  return (
    <section className={styles.schedulePage}>
      <h1 className={styles.title}>My Schedule</h1>

      {classes.length === 0 ? (
        <p className={styles.empty}>You have no classes in your schedule yet.</p>
      ) : (
        <ul className={styles.list}>
          {classes.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.topRow}>
                <span>{item.day}</span>
                <span>{item.time}</span>
              </div>

              <strong className={styles.className}>{item.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Schedule;
