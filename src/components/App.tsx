import React, {useEffect, useState} from 'react';
import api from "../api/api";
import {catchError, take} from "rxjs/operators";
import {of} from "rxjs";
import {Engineer} from "../models/engineer";


const useEngineers = (): Engineer[] => {
    const [engineers, setEngineers] = useState<Engineer[]>([]);

    useEffect(() => {
        api
            .get<Engineer[]>("engineers")
            .pipe(
                take(1),
                catchError(err => of(console.log(err)))
            )
            .subscribe(response => {
                if(response) {
                    setEngineers(response);
                }
            });
    },[]);

    return engineers;
};


export const App:React.FC = () => {
    const engineers = useEngineers();

    return (
        <>
           <div>App </div>

            <h3>Engineers</h3>
            <div>
                {
                    engineers.map(engineer =>
                        <div>
                            <p>{`${engineer.name} managed to create ${engineer.accomplishment}` }</p>
                            <button>Delete</button>
                        </div>
                    )
                }
            </div>
        </>
    );
};