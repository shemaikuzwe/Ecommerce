"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useRef, useEffect } from "react";
import { AppStore, makeStore } from "./store";
import { useAppDispatch } from "./hook";
import useStorage from "./hook";
import { cartAction } from "./cartSlice";
export default  function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <StorageProvider>{children}</StorageProvider>
    </Provider>
  );
}

function StorageProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const items = useStorage();
  useEffect(() => {
    dispatch(cartAction.setCart(items));
  }, []);
  return <>{children}</>;
}
