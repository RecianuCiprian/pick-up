interface IDoc {
    name?: string;
    bookingId: string;
    city?: string;
    country: string;
}

interface IResults {
    docs: IDoc[];
    numFound: number;
}

interface IAppState {
    results: IResults,
    err?: string,
}

export { IAppState }
