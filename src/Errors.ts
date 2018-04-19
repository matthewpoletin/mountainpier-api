"use strict";

export class ValidationError extends Error {

    public query: object;

    constructor(message: string, query: object) {
        super(message);
        this.query = query;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

}
