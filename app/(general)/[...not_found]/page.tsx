import { notFound } from 'next/navigation';
import { Error404 } from '../ui/error404';

export default function NotFoundCatchAllPage() {

    return (

        <Error404 />

    )

}