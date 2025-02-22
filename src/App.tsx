import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "@/components/home";
import { TooltipProvider } from "@/components/ui/tooltip";
import routes from "tempo-routes";

function App() {
  return (
    <TooltipProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  );
}

export default App;
