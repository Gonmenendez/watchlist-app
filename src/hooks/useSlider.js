// React
import { useEffect, useRef, useState } from "react"

// Debounce
import debounce from "just-debounce-it";

// Hooks
import { useWatchlist } from "./useWatchlist";

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowWidth(window.innerWidth);
        }, 300);
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return windowWidth;
}

function useElementWidth(){
    const elementRef = useRef(null);
    const [elementWidth, setElementWidth] = useState(0);
    const { cart } = useWatchlist()

    useEffect(() => {
        const updateWidth = () => {
            if (elementRef.current) {
                const { width } = elementRef.current.getBoundingClientRect();
                setElementWidth(width);
            }
        };
    
        updateWidth();
    
        window.addEventListener('resize', updateWidth);
    
        return () => {
            window.removeEventListener('resize', updateWidth);
        };

    }, [cart]);

    return [elementRef, elementWidth, setElementWidth]
}

export function useSlider(){
    const [ moveIndex, setMoveIndex ] = useState(0)
    const [ translateX, setTranslateX ] = useState('translateX(0px)')
    const windowWidth = useWindowWidth()
    const [ elementRef, elementWidth, setElementWidth ] = useElementWidth()
    const { cart } = useWatchlist()
    const [ leftArrow, setLeftArrow ] = useState(false)
    const [ rightArrow, setRightArrow ] = useState(false)

    useEffect(() => {
        const updateWidth = () => {
            const movieCount = cart.length;
            const movieWidth = 171.47;
            const movieGap = (cart.length + 1) * 11.2
            const totalWidth = movieCount * movieWidth + movieGap;

            if (totalWidth > windowWidth) {
                setElementWidth(totalWidth);
            } else {
                setElementWidth(windowWidth);
            }
        };

        updateWidth();
    }, [cart, windowWidth, setElementWidth]);

    useEffect(()=>{
        const arrowsShown = () => {
            const topLimit =  windowWidth - elementWidth;
            moveIndex > topLimit ? setRightArrow(true) : setRightArrow(false)
            moveIndex < 0 ? setLeftArrow(true) : setLeftArrow(false)
        }
        arrowsShown()

        if(elementWidth == 0 || elementWidth === windowWidth){
            setMoveIndex(() => {
                const newMoveIndex = 0
                setTranslateX(`translateX(${newMoveIndex}px)`)
                return newMoveIndex
            })
        } else if((elementWidth - windowWidth)* -1 > moveIndex){
            setMoveIndex(() => {
                const newMoveIndex = (elementWidth - windowWidth) * - 1
                setTranslateX(`translateX(${newMoveIndex}px)`)
                return newMoveIndex
            })
        }
    },[cart, elementWidth, translateX])

    const canMove = (direction) => {
        const topLimit =  windowWidth - elementWidth;
        return direction ? moveIndex > topLimit : moveIndex < 0
    };

    const updateMove = (direction, shift) => {
        setMoveIndex(prevState => {
            const newMoveIndex = direction ? prevState - shift : prevState + shift
            setTranslateX(`translateX(${newMoveIndex}px)`)
            return newMoveIndex
        })
    }

    
    const getMoveValue = (direction) => {
        const movement = windowWidth / 2;
        const topLimit = elementWidth - windowWidth;
        if (direction) {
            return Math.min(movement, topLimit + moveIndex);
        } else {      
            return Math.min(movement, moveIndex * -1);
        }
    };
    
    const sliderMove = (direction) => {
        if (canMove(direction)) {
            const shift = getMoveValue(direction);
            updateMove(direction, shift);
        }
    };

    return { translateX, sliderMove, elementRef, elementWidth, windowWidth, leftArrow, rightArrow}
}