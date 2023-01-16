import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "../../../styles/profileRecipe.module.css";
import Assets from "../../../public";

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/ui/auth/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const ProfileRecipe = ({ title, id, image, deleteAction }) => {
  const router = useRouter();

  return (
    <div className={style.card}>
      <div className={style.button}>
        <div onClick={() => router.push("/ui/detailResep/edit/" + id)}>
          <Image src={Assets.edit} alt="edit" width={30} height={30} />
        </div>
        <div onClick={deleteAction}>
          <Image src={Assets.hapus} alt="delete" width={30} height={30} />
        </div>
      </div>
      <img src={image} layout="fill" objectFit="cover" />
      <h2 onClick={() => router.push("/ui/detailResep/" + id)}>
        {title ? title : "Default Title"}
      </h2>
    </div>
  );
};

export default ProfileRecipe;
