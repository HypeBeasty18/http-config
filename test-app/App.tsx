import React from "react";
import { httpService, setBuildEnv, setHosts, setQueryClient, Toast } from "../src";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../src/auth-provider";

import { config } from "./constants";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({});

setBuildEnv("local");
setHosts(config);

setQueryClient(queryClient);

const useFetch = new httpService({ config: {} });

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider useFetch={useFetch}>
          <div>Home</div>
        </AuthProvider>
        <Toast.ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
