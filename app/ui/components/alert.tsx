import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface WarningProps {

    title: string;
    text: string;
    
}

export function AlertWarning(props: WarningProps) {

    return (

        <div className='w-full bg-zinc-950 border-zinc-800 border-[1px] rounded-md px-5 py-5'>
            
            <div className='flex gap-1 items-center'>

                <ExclamationTriangleIcon className='w-6 h-6' />   
                <h4 className='font-bold'>{ props.title }</h4>

            </div>
            
            <p>{ props.text }</p>

        </div>

    );

}