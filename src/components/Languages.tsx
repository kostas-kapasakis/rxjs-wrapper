import React, {useEffect, useState} from 'react';
import {Language} from "../models/language";
import api from "../api/api";
import {catchError, take} from "rxjs/operators";
import {of} from "rxjs";
import {CrudProps} from "../models/crudProps";


const Languages = (props: CrudProps) => {
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        getLanguages();

        const changeSubscription = props.change?.subscribe((change) => {
            if (change === true) getLanguages();
        });

        return (() => {
            changeSubscription?.unsubscribe();
        });

    }, [props.change]);

    const getLanguages = () => {
        return api
            .get<Language[]>("languages")
            .pipe(
                take(1),
                catchError(err => of(console.log(err)))
            )
            .subscribe(response => {
                console.log(response);
                if (response) {
                    setLanguages(response);
                }
            });
    };

    return (
        <>
            <h3>Languages</h3>
            <div className="ui middle aligned divided list">
                <div className="item" key={"new-language"}>
                    <div className="right floated content">
                        <div className="ui primary button">Add</div>
                    </div>
                    <div className="content">
                        <div className="ui  transparent input">
                            <input type="text" placeholder="language name"/>
                            <span>invented from </span>
                            <input type="text" placeholder=" company" />
                        </div>
                    </div>
                </div>
                {
                    languages.map(language =>
                        <div className="item" key={language.id}>
                            <div className="right floated content">
                                <div className="ui button"
                                     onClick={() => props.delete("languages", language.id as number)}>Delete
                                </div>
                            </div>
                            <div className="content">
                                {`${language.name} was invented by ${language.company}`}
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )

};

export default Languages;