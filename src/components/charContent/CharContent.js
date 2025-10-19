import './CharContent.scss';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
function CharContent() {
    return (
        <div className="char__content">
                <CharList data={'huy'}></CharList>
                
                <CharInfo></CharInfo>
                
            </div>
    )
}

export default CharContent