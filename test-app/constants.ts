import { IHosts } from "../src/types";

export const config: IHosts = {
  local: {
    hosts: {
      sarex: "/sarex-backend",
      gateway: "/sarex-gateway",
      bim: "",
      bimv2: "",
      comparisons: "",
      remarks: "",
      projects: "",
      workspaces: "",
      google: "",
      documentations: "",
      workflows: "",
      sarexApi: "",
      absolute: ""
    },
  },

  stage: {
    hosts: {
      workspaces: "https://stage-api.sarex.io/workspaces",
      google: "https://storage.googleapis.com/srx-tmp",
      bim: "https://stage-api.sarex.io/bim",
      bimv2: "https://stage-api.sarex.io/bimv2",
      sarex: "https://stage.sarex.io",
      documentations: "https://stage-api.sarex.io/documentations",
      workflows: "https://stage-api.sarex.io/workflows",
      sarexApi: "https://stage-api.sarex.io",
      comparisons: "https://stage-api.sarex.io/comparisons",
      remarks: "https://stage-api.sarex.io/remarks",
      projects: "https://stage-api.sarex.io/projects",
      gateway: "https://stage-api.sarex.io/gateway",
      absolute: ""
    },
  },
  prod: {
    hosts: {
      workspaces: "https://api.sarex.io/workspaces",
      google: "https://storage.googleapis.com/srx-tmp",
      bim: "https://api.sarex.io/bim",
      bimv2: "https://api.sarex.io/bimv2",
      sarex: "https://lk.sarex.io",
      documentations: "https://api.sarex.io/documentations",
      workflows: "https://api.sarex.io/workflows",
      sarexApi: "https://api.sarex.io",
      comparisons: "https://api.sarex.io/comparisons",
      remarks: "https://api.sarex.io/remarks",
      projects: "https://api.sarex.io/projects",
      gateway: "https://api.sarex.io/gateway",
      absolute: ""
    },
  },
};
