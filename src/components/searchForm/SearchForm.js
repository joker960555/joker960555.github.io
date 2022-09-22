import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './searchForm.scss';

const SearchForm = () => {

    const {getCharacterByName, loading, error} = useMarvelService();

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const [characterData, setCharacterData] = useState(null);

    const onSubmit = data => {
        getCharacterByName(data.name)
            .then(resp => setCharacterData(resp))
            .catch(e=>{console.log(e)})
        reset();
    };

    const pageUrl = (data) => {
        console.log(data)
        return data.name;
    }

    const renderURL = (name) => {
        return `There is! Visit ${name} page?`
    }

    const results = !characterData ? null : characterData.length > 0 ? 
        <Link 
            className="char__search_found"
            to={`../${pageUrl(characterData[0].name)}`}
            state={{from: characterData[0]}}
        >{renderURL(characterData[0].name)}</Link> : 
        <p className="char__search_error">
            The character was not found. Check the name and try again</p>;

    const StatusLoading = loading && <Spinner/>;
    const StatusError = error && <ErrorMessage/>;
    // const ActiveStatus = StatusError || StatusLoading || 

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="char__search">
            <div className="char__search_label">Or find a character by name:</div>
            <input 
                {...register("name", 
                    {
                        required: 'This field is required',
                    }
                )} 
                type="text" 
                placeholder="Enter name"
                className="char__search_input"
            />
            <button 
                type="submit" 
                className="char__search_button button button__main"
            >
                <div className="inner">find</div>
            </button>
            {errors.name && <p className="char__search_error">{errors.name.message}</p> || results}

        </form>
    )
}
export default SearchForm;


