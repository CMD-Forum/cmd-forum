"use client";

import { SWRConfig } from 'swr';

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const PostFetcher = (url: string | URL | Request, body: any) => 
  fetch(url, { 
    method: 'POST',
    body: JSON.stringify(body)
}).then(res => res.json())

export const SWRProvider = ({ children }: { children: any }) => {
  return <SWRConfig value={{ fetcher: fetcher }}>{children}</SWRConfig>
};