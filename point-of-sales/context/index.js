"use client";

import { getUser } from "@/app/api/auth/actions";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import Loading from "@/components/loading/Loading";
import Sidepanel from "@/components/sidepanel/Sidepanel";
import { Providers } from "@/lib/redux/Provider";
import { setUserData } from "@/lib/redux/slices/userSlice";
import { store } from "@/lib/redux/store";
import { createClient } from "@supabase/supabase-js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

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
        const { data, error } = await getUser();
        console.log("user in context", data.user);
        setUser(data.user);
        setLoading(false);
      } catch (e) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) return <Loading />;
  const persistor = persistStore(store);

  return (
    <AppContext.Provider
      // get these values in the whole app
      value={{
        user,
        supabase,
        setUser,
      }}
    >
      <Providers store={store}>
        <main>
          {/* {JSON.stringify(user)} */}
          {user && <Sidepanel />}
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        </main>
      </Providers>
      {/* children is displayed in every page */}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
