import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {

    return (
        <>
            <ErrorBoundary>
                <ComicsList/>
                <AppBanner/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;