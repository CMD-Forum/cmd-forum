"use client";

import { SWRConfig } from 'swr';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const SWRProvider = ({ children }: { children: any }) => {
  return <SWRConfig value={{ fetcher: fetcher }}>{children}</SWRConfig>
};