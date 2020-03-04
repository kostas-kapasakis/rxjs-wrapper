import React from 'react';
import api from "../api/api";
import Languages from "./Languages";
import {Engineer} from "../models/engineer";
import {Language} from "../models/language";
import Engineers from "./Engineers";
import { Subject} from "rxjs";
import {take} from "rxjs/operators";

export const useObservable = () => {
    const subj = new Subject<boolean>();

    const next = (value:boolean): void => {
        subj.next(value) };

    return { change: subj.asObservable() , next};
};


export const App: React.FC = () => {
    const {change: engineerChange, next: engNext} = useObservable();
    const {change: languagesChange, next: lanNext} = useObservable();

    const addItem = (url: string, item: (Engineer | Language)):void => {
        api.post(url, item)
            .pipe(take(1))
            .subscribe(() => {
            url === 'engineers' ? engNext(true) : lanNext(true);
        });
    };

    const updateItem = (url :string, item:(Engineer | Language)) => {
        api.put(url, item)
            .pipe(take(1))
            .subscribe(() => {
                url === 'engineers' ? engNext(true) : lanNext(true);
            });
    };

    const deleteItem = (url: string, id: number): void => {
        api.delete(url, id)
            .subscribe(() => {
                url === 'engineers' ? engNext(true) : lanNext(true);
            });
    };

    return (
        <>
            <div className="ui container">

                <h1>Coding World </h1>

                <div className="ui internally celled grid">
                    <div className="row">
                        <div className="sixteen wide column">
                            <Engineers  delete={deleteItem} add={addItem} update={updateItem} change={engineerChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="sixteen wide column">
                            <Languages delete={deleteItem} add={addItem} update={updateItem} change={languagesChange}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};