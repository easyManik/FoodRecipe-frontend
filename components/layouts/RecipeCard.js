import style from "../../styles/card.module.css";
import Image from "next/image";

export default function RecipeCard({
  key,
  title,
  photo,
  path,
  type,
  drop,
  update,
}) {
  console.log(photo);
  return (
    <>
      <div className="col-sm-3 mb-4">
        <div className={[["card"], style["cards"]].join(" ")} key={key}>
          <div className={style["card-body"]}>
            <div className={style["img-div"]}>
              <Image
                className={style["imgproduct"]}
                src={photo}
                alt="jas"
                onClick={path}
              />
              {type === "edit" && (
                <i onClick={drop} className="bi bi-x-circle"></i>
              )}
              {type === "edit" && <button onClick={update}>Update</button>}
              <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
