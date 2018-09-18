import * as React from 'react';
import './App.scss';
// @ts-ignore
import { debounce } from 'throttle-debounce';
import cx from 'classnames';
import { IAppState } from './AppI';

class App extends React.Component<any, IAppState> {
    private readonly emitChangeDebounced: any;

    constructor(props: any) {
        super(props);
        this.state = {
            results: {
                docs: [],
                numFound: 0,
            },
            err: '',
        };
        this.emitChangeDebounced = debounce(500, this.handleChangeDebounce);
    }

    public render() {
        const {results: {docs, numFound}, err} = this.state;
        const classDropdown = cx('rc-app__dropdown-content', {'show': docs});

        return (
            <div className="rc-app">
                <div className="rc-app__pick_up">
                    <div className="rc-app__pick_up__title">Where are you going?</div>
                    <div className="rc-app__dropdown">
                        <div className="rc-app__pick_up--position">
                            <label htmlFor="location">Pick-up Location</label>
                            <input
                                type="text"
                                placeholder="city, airport, station, region and district..."
                                onChange={this.onChange}
                                id="location"
                                aria-label="Pick Up Location"
                            />
                        </div>
                        <div className={classDropdown}>
                            {docs && docs.map((doc: any) => {
                                if (!numFound) {
                                    return (
                                        <div className="rc-app__no-results">
                                            {doc.name}
                                        </div>
                                    )
                                }
                                const info = doc.city ? `${doc.city}, ${doc.country}` : `${doc.country}`;
                                return (
                                    <div className="rc-app__results" key={doc.bookingId}>
                                        <div className="rc-app__results__title">{doc.name}</div>
                                        <div className="rc-app__results__info">{info}</div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    {err && (
                        <div className="rc-app__error">
                            {err}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private onChange = (e: any) => {
        const {value} = e.target;
        this.emitChangeDebounced(value)
    };

    private handleChangeDebounce(value: string) {
        if (value.length > 1) {
            this.fetchData(value, 6);
        } else {
            this.setState({
                results: {
                    docs: [],
                    numFound: 0,
                },
            })
        }
    }

    private fetchData(input = '', requiredNumber = 0) {
        fetch(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${requiredNumber}&solrTerm=${input}`)
            .then((data) => {
                data.json().then((responseData) => {
                    const {results = {}} = responseData;
                    this.setState({
                        results,
                    })
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    err: 'An error has occurred',
                })
            })
    }
}

export default App;
