import { useEffect, useRef } from "react";

export function useOutClickClose (callback) {
    const menuRef = useRef()
    
    useEffect(() => {
        const outClickHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                callback();
            }
        }
    
        document.addEventListener('mousedown', outClickHandler);

        return () => {
            document.removeEventListener('mousedown', outClickHandler);
        }
    }, [callback]);

    return { menuRef }
}