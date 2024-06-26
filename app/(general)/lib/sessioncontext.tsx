"use client";
import React, { createContext, useContext } from "react";

import { getAuth } from "@/app/(general)/lib/auth";

type ContextType = Awaited<ReturnType<typeof getAuth>>;

const SessionContext = createContext<ContextType>({ session: null, user: null });

/**
 * ## useSession
 * ---
 * Retrieves the user session. Use only in Client Components, use `getAuth()` for Server Components.
 * @example
 * const { user } = useSession();
 * const { session } = useSession();
 */
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, value }: React.PropsWithChildren<{ value: ContextType }>) => {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};