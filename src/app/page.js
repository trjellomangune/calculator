"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Calculator from "./components/calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <Calculator />
    </div>
  );
}
