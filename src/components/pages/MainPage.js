
import vision from '../../resources/img/vision.png' 

import CharContent from '../charContent/CharContent';
import Randomchar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const MainPage = () => {
    return (
        <>
            <ErrorBoundary>
                <Randomchar/>
            </ErrorBoundary>

            <ErrorBoundary>
                <CharContent/> 
            </ErrorBoundary> 
            
            
            <img className="bg-decoration" src={vision} alt="vision"></img>
        </>
    )
}

export default MainPage