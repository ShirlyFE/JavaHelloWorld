import React from 'react';
import { mount } from 'enzyme';
import Amendment from 'index/PermitContract/components/Amendment';
import amendmentDatum from 'json/PermitContract/amendment.json';

const props = {
  amendments: amendmentDatum.body.amendments
};

const setup = initProps => mount(<Amendment {...initProps} />);

describe('Amendment Component', () => {
  test('Render correctly', () => {
    const component = setup(props);
    const amendmentContainner = component.find('.amendments');
    const expandIcon = amendmentContainner.find('.collapse-panel__title').at(0).find('i');

    Array.prototype.slice.call = jest.fn(() => [{ }]);

    expect(component.length).toEqual(1);
    expect(amendmentContainner.length).toEqual(1);
    expect(expandIcon.length).toEqual(1);

    expandIcon.simulate('click');
    const expandPanel = component.find('div.collapse-panel__body.expanded');
    expect(expandPanel).toHaveLength(1);
  });
});
