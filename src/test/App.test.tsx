import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});
import App from '../App';

test('render app with no data', () => {
    const component = renderer.create(
        <App/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
});
