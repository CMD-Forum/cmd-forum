"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

export default function SupportList() {

    const { data: articles, error, isLoading } = useSWR('/api/support/getAll', fetcher)
    
    if ( error ) {
        return <p>error</p>
    }
    if ( isLoading ) {
        return (
            <div 
                className="mb-4 animate-pulse flex flex-col gap-4"
            >
          
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />
                <div className="flex w-full bg-border rounded-md h-[94px]" />

            </div>
        );
    }

    return (
            <>
                {/* @ts-ignore-error */}
                {Array.isArray(articles) && articles.map((article) => {
            
                    if ( ! article.name ) {

                        article.name = "Article does not have a name"

                    }

                    return (
                        <motion.div 
                          key={article.id}
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
                          className="mb-4"
                        >
                        
                        <Link className="flex flex-col w-full bg-card border-border border-[1px] p-5 group rounded-md transition-all" href={`/support/${article.id}`}>
                            <h2 className="w-fit font-sans font-semibold text-lg group-hover:text-gray-300 transition-all">{article.title}</h2>    
                            <p className="text-gray-300">{article.tagline}</p>
                        </Link>

                        </motion.div>
                      );
                })}
            </>
        );
    }
    