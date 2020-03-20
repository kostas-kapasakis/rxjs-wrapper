import React, {useEffect, useState} from 'react';
import {Engineer} from "../models/engineer";
import {CrudProps} from '../models/crudProps';
import {Span} from "./styled/Span";


const Engineers = (props: CrudProps<Engineer>) => {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [name, setName] = useState<string>('');
    const [accomplishment, setAccomplishment] = useState<string>('');

    const resetInputs = () => {
        setName('');
        setAccomplishment('');
    };

    useEffect(() => {
        const getEngineers = () =>
            props.get('engineers').subscribe((response => {
            setEngineers(response);
        }));

        getEngineers();

        const changeSubscription = props
            .change?.subscribe((change) => {
                if (change) getEngineers();
            });

        return (() => {
            changeSubscription?.unsubscribe();
        })
    }, []);

    return (
        <>
            <h3>Engineers</h3>

            <div className="ui middle aligned divided list">
                <div className="item" key={"new-engineer"}>
                    <div className="right floated content">
                        <div className="ui primary button"
                             onClick={() => {props.add("engineers", {name, accomplishment}); resetInputs();}}>Add
                        </div>
                    </div>
                    <div className="content">
                        { <div className="ui transparent input">
                            <input type="text"  placeholder="Engineers name" value={name}
                                   onChange={e => setName(e.target.value)}/>
                            <Span>managed to create</Span>
                            <input type="text" placeholder=" Engineer Accomplishment" value={accomplishment}
                                   onChange={e => setAccomplishment(e.target.value)}/>
                        </div>}
                    </div>
                </div>
                {
                    engineers.map(engineer =>
                        <div className="item" key={engineer.id}>
                            <div className="right floated content">
                                <div className="ui  button"
                                     onClick={() => props.delete("engineers", engineer.id as number)}>Delete
                                </div>
                            </div>
                            <div className="content">
                                {engineer.name} <span>managed to create</span> {engineer.accomplishment}
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};


export default Engineers;