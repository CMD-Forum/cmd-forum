"use server";

const ogs = require("open-graph-scraper");

export default async function getOGS({ url }: { url: string }) {
    const result = ogs({ url: url });
    return result;
}
