"use client";

import Sidebar from "@/components/auth/sidebar/Sidebar";
import Sidepanel from "@/components/sidepanel/Sidepanel";
import { createClient } from "@supabase/supabase-js";

const { createContext, useState, useContext, useEffect } = require("react");

//create app context
const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  //fetchUser when the app launches

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        console.log("userData in context", data.session);
        if (!data.session) {
          setUser(data);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <AppContext.Provider
      // get these values in the whole app
      value={{
        user,
        supabase,
        setUser,
      }}
    >
      {/* children is displayed in every page */}
      <main>
        {user?.id && <Sidepanel />}
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
      </main>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
