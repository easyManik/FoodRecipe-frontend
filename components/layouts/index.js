import React from "react";
import Link from "next/link";

export const Layouts = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand bg-light d-flex flex-row text-dark justify-content-evenly mb-5 ">
        <Link href="/ui/landingPage/LandingPage">Home</Link>
        <Link href="/ui/addRecipe/AddRecipe">Add Recipe</Link>
        <Link href="/ui/profile/Profile">Profile</Link>
      </nav>
      <div>{children}</div>
    </>
  );
};
