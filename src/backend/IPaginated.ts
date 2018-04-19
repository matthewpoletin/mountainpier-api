"use strict";

export default interface IPaginated {
    content: any[];
    pageable: {
        sort: {
            unsorted: boolean;
            sorted: boolean;
        },
        pageSize: number;
        pageNumber: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: {
        unsorted: boolean;
        sorted: boolean;
    };
    number: number;
    numberOfElements: number;
    first: boolean;
    size: number;
}
