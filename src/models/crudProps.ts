import {Engineer} from "./engineer";
import {Language} from "./language";
import {Observable} from "rxjs";

export interface CrudProps  {
    delete: (url: string, id: number) => void
    add: (url: string, item: (Engineer | Language)) => void;
    update: (url: string, item: (Engineer | Language)) => void;
    change: Observable<boolean> | undefined;
}
