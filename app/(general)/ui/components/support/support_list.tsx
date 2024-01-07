"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

export default function SupportList() {

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState();
    
    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            const res = await fetch('/api/support/getAll');
            const data = await res.json();
            setArticles(data);
            setIsLoading(false);
        };
    
        fetchArticles();

    }, []);
    
    if (isLoading) {

        return <div className='post-loading-text'>Loading...</div>;

    }
    
        return (
            <>
                {/* @ts-ignore-error */}
                {Array.isArray(articles) && articles.map((articles) => {
            
                    if ( ! articles.name ) {

                        articles.name = "Article does not have a name"

                    }

                    return (
                        <motion.div 
                          key={articles.id}
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
                        >
                        
                        <Link className="flex flex-col w-full bg-[#131313] p-5 hover:bg-zinc-800 rounded-md transition-all" href={`/support/${articles.id}`}>
                            <h2 className="w-fit font-sans font-semibold text-lg">{articles.title}</h2>    
                            <p className="text-gray-300">{articles.tagline}</p>
                        </Link>

                        </motion.div>
                      );
                })}
            </>
        );
    }
    