import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAuthStatus() {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [checkingStatus, setCheckingStatus] = React.useState(true);

    const isMounted = React.useRef(true)

    React.useEffect(() => {

        if (isMounted) {
            const auth = getAuth();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }
        return () => {
            isMounted.current = false
        }

    }, [isMounted])
    return { loggedIn, checkingStatus }
}

export default useAuthStatus