import React, {useEffect, useState} from 'react';
import api from "../api/api";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Engineer} from "../models/engineer";
import {Language} from "../models/language";


export const App: React.FC = () => {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        const engineersSubscription = getEngineers().subscribe(response => {
            if (response) {
                setEngineers(response);
            }
        });

        const languagesSubscription = getLanguages().subscribe(response => {
            if (response) {
                setLanguages(response);
            }
        });

        return (() => {
            engineersSubscription.unsubscribe();
            languagesSubscription.unsubscribe();
        })
    }, [engineers, languages]);

    const getEngineers = () => {
        return api
            .get<Engineer[]>("engineers")
            .pipe(
                catchError(err => of(console.log(err)))
            )
    };


    const getLanguages = () => {
        return api
            .get<Language[]>("languages")
            .pipe(
                catchError(err => of(console.log(err)))
            );
    };

    const deleteItem = (url: string, id: number) => {
        api.delete(url, id).subscribe(() => {
            url === 'engineers' ? setEngineers(engineers.slice(id, 1)) : setLanguages(languages.slice(id, 1));
        });
    };

    return (
        <>

            <div className="ui container">

                <h1>Coding World </h1>

                <div className="ui internally celled grid">
                    <div className="row">
                        <div className="sixteen wide column">
                            <h3>Engineers</h3>

                            <div className="ui middle aligned divided list">
                                <div className="item" key={"new-engineer"}>
                                    <div className="right floated content">
                                        <div className="ui primary button" onClick={() => deleteItem("engineers", 0)}>Add</div>
                                    </div>
                                    <div className="content">
                                        <div className="ui transparent input">
                                            <input type="text" placeholder="Add"/>
                                        </div>
                                    </div>
                                </div>

                                {
                                    engineers.map(engineer =>
                                        <div className="item" key={engineer.id}>
                                            <div className="right floated content">
                                                <div className="ui teal button"
                                                     onClick={() => deleteItem("engineers", engineer.id)}>Edit
                                                </div>
                                                <div className="ui  button"
                                                     onClick={() => deleteItem("engineers", engineer.id)}>Delete
                                                </div>
                                            </div>
                                            <div className="content">
                                                {`${engineer.name} managed to create ${engineer.accomplishment}`}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="sixteen wide column">

                            <h3>Languages</h3>
                            <div className="ui middle aligned divided list">
                                <div className="item" key={"new-language"}>
                                    <div className="right floated content">
                                        <div className="ui primary button" onClick={() => deleteItem("language", 0)}>Add</div>
                                    </div>
                                    <div className="content">
                                        <div className="ui  transparent input">
                                            <input type="text" placeholder="Add"/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    languages.map(language =>
                                        <div className="item" key={language.id}>
                                            <div className="right floated content">
                                                <div className="ui teal button"
                                                     onClick={() => deleteItem("engineers", language.id)}>Edit
                                                </div>
                                                <div className="ui button"
                                                     onClick={() => deleteItem("languages", language.id)}>Delete
                                                </div>
                                            </div>
                                            <div className="content">
                                                {`${language.name} managed to found ${language.company}`}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};