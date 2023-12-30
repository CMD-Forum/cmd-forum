import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface AlertProps {

    title: string;
    text: string;
    
}

export function AlertWarning(props: AlertProps) {

    return (

        <div className='w-full bg-zinc-950 border-zinc-800 border-[1px] rounded-md p-5 facebookTheme:p-3 facebookTheme:border-[#b3b3b3] facebookTheme:bg-white facebookTheme:rounded-none'>
            
            <div className='flex gap-1 items-center text-orange-500'>

                <ExclamationTriangleIcon className='w-6 h-6' />   
                <h4 className='font-bold'>{ props.title }</h4>

            </div>
            
            <p>{ props.text }</p>

        </div>

    );

}

export function AlertSuccess(props: AlertProps) {

    return (

        <div className='w-full bg-zinc-950 border-zinc-800 border-[1px] rounded-md p-5 facebookTheme:p-3 facebookTheme:border-[#b3b3b3] facebookTheme:bg-white facebookTheme:rounded-none'>
            
            <div className='flex gap-1 items-center text-green-500'>

                <CheckCircleIcon className='w-6 h-6' />   
                <h4 className='font-bold'>{ props.title }</h4>

            </div>
            
            <p>{ props.text }</p>

        </div>

    );

}

export function AlertFailure(props: AlertProps) {

    return (

        <div className='w-full bg-zinc-950 border-zinc-800 border-[1px] rounded-md p-5 facebookTheme:p-3 facebookTheme:border-[#b3b3b3] facebookTheme:bg-white facebookTheme:rounded-none'>
            
            <div className='flex gap-1 items-center text-red-500'>

                <XCircleIcon className='w-6 h-6' />   
                <h4 className='font-bold'>{ props.title }</h4>

            </div>
            
            <p>{ props.text }</p>

        </div>

    );

}