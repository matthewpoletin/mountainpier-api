import repository = require("./repository");

declare namespace Repository {
    export function pushBack(request: object, queue: string): Promise<void>;
    export function pushFront(request: object, queue: string): Promise<void>;
    export function popFront(queue: string): Promise<object>;
    export function length(queue: string): Promise<number>;
}

export = Repository;
