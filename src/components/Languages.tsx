import React, {useEffect, useState} from 'react';
import {Language} from "../models/language";
import {CrudProps} from "../models/crudProps";
import {Span} from "./styled/Span";


const Languages = (props: CrudProps<Language>) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [name, setName] = useState<string>('');
    const [company, setCompany] = useState<string>('');

    const resetInputs = () => {
        setName('');
        setCompany('')
    };

    useEffect(() => {
        const getLanguages = () =>
            props.get('languages').subscribe((response => {
                setLanguages(response);
            }));

        getLanguages();

        const changeSubscription = props.change?.subscribe((change) => {
            if (change) getLanguages();

        });

        return (() => {
            changeSubscription?.unsubscribe();
        });

    }, [props.change]);

    return (
        <>
            <h3>Languages</h3>
            <div className="ui middle aligned divided list">
                <div className="item" key={"new-name"}>
                    <div className="right floated content">
                        <div onClick={() => { props.add("languages", {name:name,company}); resetInputs();}} className="ui primary button">Add</div>
                    </div>
                    <div className="content">
                        <div className="ui  transparent input">
                            <input type="text" value={name}
                                   onChange={e => setName(e.target.value)} placeholder="Programming Language"/>
                            <Span>invented from </Span>
                            <input type="text"  value={company}
                                   onChange={e=> setCompany(e.target.value)} placeholder="Company" />
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