import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initLeads, initMetrika } from "./submit";

initLeads();
initMetrika();
createRoot(document.getElementById("root")).render(<App />);
