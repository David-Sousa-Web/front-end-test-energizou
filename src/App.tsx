import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { CompanyProvider } from "./context/CompanyContext";

export default function App() {
  return (
    <CompanyProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CompanyProvider>
  );
}

// #FFCC00
