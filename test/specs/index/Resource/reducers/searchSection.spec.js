import { is, fromJS } from 'immutable';
import * as actions from 'index/Resource/actions/searchSection';
import reducer from 'index/Resource/reducers/searchSection';


describe('index -> Resource -> reducers -> searchSection', () => {
  const initState = fromJS({showSearchBar: false,fixedSearchBar: false});

  it('should return the initial state', () => {
    expect(is(initState, reducer(undefined, {}))).toBe(true);
  });

  it('IS_SHOW_SEARCH_BAR should work fine', (done) => {
    let state = reducer(undefined, {type:actions.IS_SHOW_SEARCH_BAR});

    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().showSearchBar).toBe(true);
    done();
  });

  it('IS_FIXED_SEARCHBAR should work fine', (done) => {
    let state = reducer(undefined, {type:actions.IS_FIXED_SEARCHBAR,payload: {isFixed : false}});
    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().fixedSearchBar).toBe(false);
    done();
  });
});
