import { signOut } from "next-auth/react"

export default function LogoutButton() {

    const onClick = () => {
        signOut();
    }

    return (
        <button onClick={onClick}>Logout</button>    
    );

} 