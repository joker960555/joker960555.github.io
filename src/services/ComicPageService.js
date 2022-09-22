

const ComicPage = ({name, price = null, thumbnail, description, pageCount = null, language = null}, link = null) => {
console.log(name, thumbnail)
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                {pageCount && <p className="single-comic__descr">{pageCount} pages</p>}
                {language && <p className="single-comic__descr">Language: {language}</p>}
                {price && <div className="single-comic__price">{price}</div>}
            </div>
            {link}
        </div>
    );
}

export default ComicPage;