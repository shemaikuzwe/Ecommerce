"use client"
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useRef } from "react";
import { AppStore,makeStore } from "./store";
export default function Providers({ children }: { children: ReactNode }) {
  const storeRef=useRef<AppStore>();
  if(!storeRef.current){
    storeRef.current=makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
