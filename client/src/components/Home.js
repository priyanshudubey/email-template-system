import React from "react";
import TextEditor from "./TextEditor";

const Home = () => {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="text-3xl bg-orange-700 text-white">Home</h1>
        </div>
      </div>
      <TextEditor />
    </>
  );
};

export default Home;
