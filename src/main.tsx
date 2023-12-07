
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


// import { QueryProvider } from "@/lib/react-query/QueryProvider";

import App from "./App";
import { AuthProvider } from "./context/Authcontext";
import Queryprovider from "./lib/react-query/Queryprovider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Queryprovider>
    <AuthProvider>
      <App/>
     </AuthProvider>
  </Queryprovider>
 
  </BrowserRouter>
);