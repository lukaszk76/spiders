import { useState, useEffect } from "react";
  
// provides width and height of window of a device the page is displayed on
// return: [width:number, height:number] - a list containing dimensions of the window 
const useWindowDimensions = () => {
    
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    useEffect( () => {
        if (typeof window !== undefined) {      //window is not defined if SSR. Execute only on client's side.
            function handleResize() {
                setWindowSize( {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }

            window.addEventListener("resize", handleResize);
            handleResize();

            return () => window.removeEventListener("resize", handleResize)
        }
    }, [] );
    return windowSize;
}

export default useWindowDimensions;