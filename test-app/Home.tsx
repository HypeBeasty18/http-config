import { useState } from "react";
import { useFetch } from "./App";
import { z } from "zod";
import React from "react";

export const Home = () => {
  const [data, setData] = useState([]);

  const handleClick = () => {
    useFetch
      .getRequest({
        service: "gateway",
        url: "/api/v2/resources",
        cache: true,
        queryOptions: {
          staleTime: 10000 * 60 * 10,
        },
      })
      .then((response) => setData(response.data.results.map((project) => project.name)));
  };

  const handleInvalidate = () => {
    useFetch
      .getRequest({
        service: "gateway",
        url: "/api/v2/resources",
        cache: true,
        queryOptions: {
          staleTime: 10000 * 60 * 10,
        },
        invalidate: true,
      })
      .then((response) => setData(response.data.results.map((project) => project.name)));
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Click me</button>
        <button onClick={handleInvalidate}>Click invalidate</button>

        <ul>
          {data.map((projectID) => (
            <li key={projectID}>{projectID}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
