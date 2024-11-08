import React from "react";

import "react-toastify/dist/ReactToastify.css";

import {
  setBuildEnv,
  setHosts,
  setQueryClient,
  httpService,
  ToastContainer,
  AuthProvider,
} from "../src";
import { config } from "./constants";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./Home";

const queryClient = new QueryClient({});

setBuildEnv("local");
setHosts(config);

setQueryClient(queryClient);

export const useFetch = new httpService({ config: {} });

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider useFetch={useFetch}>
          <div>
            <Home />
          </div>
        </AuthProvider>
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
