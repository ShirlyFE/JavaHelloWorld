import React from 'react';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as authority from 'shared/actions/Authority';
import rootRender, { registerResize } from 'shared/components/Root';

class Module extends React.Component {
  render() {
    return <div className="mock-component">Mock Compoent</div>;
  }
}

describe('shared -> components -> Root', () => {
  let store = null;
  let clock = null;
  
  beforeEach(() => {
    const appRoot = document.createElement('div');
    appRoot.setAttribute('id', 'app-root');
    document.body.appendChild(appRoot);

    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData: {
        permitID: '2'
      },
      loading: fromJS({dispaly: false})
    });
    parent.name = 'sdi_main';
    clock = jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('app-root'));

    store.clearActions();
    parent.name = '';
    clock.clearAllTimers();
  });

  it('should call registerResize function correctly', () => {
    const resizeCallback = jest.fn();
    registerResize(resizeCallback);
    $(parent).resize();
    expect(resizeCallback).not.toHaveBeenCalled();
  });

  it('window.onload should work fine', () => {
    window.onload();
  });
});
