import React, {useEffect, useState} from 'react';
import api from "../api/api";
import {Engineer} from "../models/engineer";
import {catchError, take} from "rxjs/operators";
import {of} from "rxjs";
import {CrudProps} from '../models/crudProps';


const Engineers = (props: CrudProps) => {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [name, setName] = useState<string>('');
    const [accomplishment, setAccomplishment] = useState<string>('');
    const [input, setInput] = useState<boolean>(false);

    const getEngineers = () => {
        api
            .get<Engineer[]>("engineers")
            .pipe(
                take(1),
                catchError(err => of(console.log(err)))
            ).subscribe((response) => {
            if (response) {
                setEngineers(response);
            }
        });
    };

    useEffect(() => {
        getEngineers();

        const changeSubscription = props
            .change?.subscribe((change) => {
                if (change === true) getEngineers();
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
                             onClick={() => props.add("engineers", {name, accomplishment})}>Add
                        </div>
                    </div>
                    <div className="content">
                        { <div className="ui transparent input">
                            <input type="text" placeholder="Engineers name"
                                   onChange={event => setName(event.target.value)}/>
                            <span>managed to create</span>
                            <input type="text" placeholder=" Engineer Accomplishment"
                                   onChange={event => setAccomplishment(event.target.value)}/>
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