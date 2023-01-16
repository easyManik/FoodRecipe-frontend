import React from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const CardHome = ({ title, id, image }) => {
  const router = useRouter();

  return (
    <div
      className={style.card}
      onClick={() => router.push("/ui/detailResep/" + id)}
    >
      <img src={image} layout="fill" objectFit="cover" />
      <h2>{title ? title : "Default Title"}</h2>
    </div>
  );
};

export default CardHome;
