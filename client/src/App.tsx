import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import JuneGames from "./pages/JuneGames";
import JuneTech from "./pages/JuneTech";
import JulyTrends from "./pages/JulyTrends";
import JulyArchive from "./pages/JulyArchive";
import AugustTrends from "./pages/AugustTrends";
import AugustPulse from "./pages/AugustPulse";
import AiTools from "./pages/AiTools";
import OpenSource from "./pages/OpenSource";
import CaseStudies from "./pages/CaseStudies";
import GeoMarket from "./pages/GeoMarket";
import Outlook from "./pages/Outlook";
import XboxReset from "./pages/XboxReset";
import XboxResetPulse from "./pages/XboxResetPulse";
import Modmixer from "./pages/Modmixer";
import Dreamfall from "./pages/Dreamfall";
import PeerArenaNote from "./pages/PeerArenaNote";
import KaggleInsights from "./pages/KaggleInsights";
import NotFound from "./pages/NotFound";

// wouter does not manage scroll position, so a route change would otherwise
// keep the previous page's offset and land the reader mid-content.
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const target = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null;
    if (target) {
      target.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/junegames" component={JuneGames} />
      <Route path="/junetech" component={JuneTech} />
      <Route path="/julytrends" component={JulyTrends} />
      <Route path="/july-archive" component={JulyArchive} />
      <Route path="/augusttrends" component={AugustTrends} />
      <Route path="/august-pulse" component={AugustPulse} />
      <Route path="/ai-tools" component={AiTools} />
      <Route path="/open-source" component={OpenSource} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/geo-market" component={GeoMarket} />
      <Route path="/outlook" component={Outlook} />
      <Route path="/xboxreset" component={XboxReset} />
      <Route path="/xboxreset-pulse" component={XboxResetPulse} />
      <Route path="/modmixer" component={Modmixer} />
      <Route path="/dreamfall" component={Dreamfall} />
      <Route path="/peer-arena-note" component={PeerArenaNote} />
      <Route path="/kaggle-insights" component={KaggleInsights} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
