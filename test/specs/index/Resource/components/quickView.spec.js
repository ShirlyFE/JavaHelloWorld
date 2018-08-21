import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { QuickView } from 'index/Resource/components/QuickView';

const actions = {
  fetchQuickView: jest.fn(),
  setQuickView: jest.fn(),
  deleteQuickView: jest.fn(),
  saveQuickView: jest.fn(),
  showQuickViewModel: jest.fn(),
  validateQuickView: jest.fn()
};

const quickView = fromJS(
  {
    data: fromJS([ {
      "id": 6,
      "name": "test1",
      "value": 6,
      "text": "test1",
      "selected": true,
      "resource_ids": [
          10,
          11
      ]
    } ]),
    selectedView: 6,
    showModel: false,
    name: 'view',
    errorMessage: ''
  }
);

const filters = {
  resources : fromJS({
    data: [{}],
    selected: [1],
    loading: false,
    totalSize: 0,
    errMsg: '',
    isFetchData: false
  })
}

const setup = (view, filters) => {
  return mount(<QuickView  filters={filters} quickView={view} {...actions} />);
};

describe('index/resource/components/QuickView', () => {
  it('component and initialization works fine', () => {
    const component = setup(quickView, filters);
    expect(component.find('Dropdown').length).toBe(1);
    expect(component.find('.icon-btn-save').length).toBe(1);
    expect(component.find('Model').length).toBe(0);
  });

  it('Save button should be disabled when selectedView != -1', () => {
    const component = setup(quickView, filters);

    const disabledButton = component.find('.disabled-button');
    expect(disabledButton.node.disabled).toBeTruthy();
    
  });

  it('Save button should be disabled', () => {
    const filter = {
      resources : fromJS({
        data: [],
        selected: [],
        loading: false,
        totalSize: 0,
        errMsg: '',
        isFetchData: false
      })
    };

    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'view',
        errorMessage: ''
      }
    );
    const component = setup(data, filter);

    const disabledButton = component.find('.disabled-button');
    expect(disabledButton.node.disabled).toBeTruthy();

    const filters1 = {
      resources : fromJS({
        data: [{}],
        selected: [],
        loading: false,
        totalSize: 0,
        errMsg: '',
        isFetchData: false
      })
    };

    const component1 = setup(data, filters1);

    const disabledButton1 = component1.find('.disabled-button');
    expect(disabledButton1.node.disabled).toBeTruthy();
    expect(disabledButton1.node.title).toEqual('Save quick view');

    const data1 = fromJS(
      {
        data: fromJS([1,2,3,4,5,6,7,8,9,10,11,11,12,13,14,15,16,17,18,19,20,21]),
        selectedView: -1,
        showModel: true,
        name: 'view',
        errorMessage: ''
      }
    );

    const component2 = setup(data1, filters);
    const disabledButton2 = component2.find('.disabled-button');
    expect(disabledButton2.node.disabled).toBeTruthy();
    expect(disabledButton2.node.title).toEqual('Maixmum 20 quick views can be saved');
  });

  it('show Model well and error messge is not null', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: 6,
        showModel: true,
        name: 'view',
        errorMessage: 'Max 50 chars'
      }
    );

    const component = setup(data, filters);
    const model = component.find('.modal-body');
    expect(component.find('.modal-body').length === 1).toBeTruthy();
    const buttons = component.find('button');
    expect(buttons.length === 4).toBeTruthy();
    const input = component.find('.input-error');
    expect(input.length === 1).toBeTruthy();
    const errorMessage = component.find('.error-message');
    expect(errorMessage.length === 1).toBeTruthy();
    expect(errorMessage.text()).toBe('Max 50 chars');
    const desc = component.find('.desc');
    expect(desc.length === 1).toBeTruthy();
  });

  it('show Model well and error messge is epmpty', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: 6,
        showModel: true,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const input = component.find('.input-error');
    expect(input.length === 0).toBeTruthy();
    const errorMessage = component.find('.error-message');
    expect(errorMessage.text()).toBe('');
    const desc = component.find('.desc');
    expect(desc.length === 1).toBeTruthy();
  });

  it('show call showQuickViewModel when click the save button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const saveButton = component.find('.icon-btn-save');
    expect(saveButton.node.disabled).toBeFalsy();

    saveButton.simulate('click');
    expect(actions.showQuickViewModel).toHaveBeenCalledTimes(1);
  });

  it('should call validateQuickView when input quick view name ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    expect(dialog.length).toBe(1);
    const input = component.find('#quickViewName');
    expect(input.length).toBe(1);
    input.prop('onChange')({ target: { value: 'tttt' } });
    input.value = 'tttt';
    input.simulate('blur', { target: { value: 'tttt'} });
    expect(actions.validateQuickView).toHaveBeenCalledTimes(1);
  });

  it('should call saveQuickView when click confirm button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    expect(dialog.length).toBe(1);
    const input = component.find('#quickViewName');
    expect(input.length).toBe(1);
    input.value = 'tttt';
    input.simulate('blur', { target: { value: 'tttt'} });
    expect(actions.validateQuickView).toHaveBeenCalled();

    const buttons = dialog.find('button');
    expect(buttons.length).toBe(2);
    buttons.last().simulate('click');
    expect(actions.saveQuickView).toHaveBeenCalled();
  });

  it('should call showQuickViewModel when click cancel button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModal: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    const buttons = dialog.find('button');
    buttons.first().simulate('click');
    expect(actions.showQuickViewModel).toHaveBeenCalled();
  });

  it('show call setQuickView when dropdown change ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const dropdown = component.find('Dropdown');
    dropdown.prop('onChange')({value: '1'});
    expect(actions.setQuickView).toHaveBeenCalled();
  });

  it('show call deleteQuickView when delete quick view ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const dropdown = component.find('Dropdown');
    dropdown.simulate('click');

    const items = component.find('li');
    expect(items.length).toBe(1);

    const spans = items.find('span');
    spans.first().simulate('click');
    spans.last().simulate('click');
    expect(actions.deleteQuickView).toHaveBeenCalled();
  });
});
