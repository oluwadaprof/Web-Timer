import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/home";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  );
}

export default App;
