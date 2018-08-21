import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { isShowSearchBar, clearFilter } from 'index/Resource/actions/searchSection';
import SearchSection from 'index/Resource/components/SearchSection';

jest.mock('index/Resource/actions/searchSection', () => ({
  isShowSearchBar: jest.fn(),
  clearFilter: jest.fn(() => Promise.resolve())
}));

const initialData = {
  facilityTypeLabel: 'FacilityXX',
  permitID: -1,
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};

const mockData = {
  data: [{
    name: '111111Lois Ce&amp;nter without Facility',
    id: 138,
    selected: false
  }, {
    name: '14.5 Sprint 4 Moon\'s center',
    id: 151,
    selected: false
  }, {
    name: '3 center',
    id: 149,
    selected: false
  }],
  selected: []
};

const searchSection = { showSearchBar: false };

const filtersProps = {
  centers: fromJS(mockData),
  eventTypes: fromJS(mockData),
  resourceTypes: fromJS({ ...mockData, ...{ selected: [138, 151] } }),
  facilityTypes: fromJS({ ...mockData, ...{ selected: [1] } }),
  resources: fromJS({
    data: [],
    selected: [],
    error: false,
    loading: false,
    deselectAll: true,
    totalSize: 0,
    errMsg: ''
  })
};

const props = {
  filters: filtersProps,
  searchSection: fromJS(searchSection),
  booking: fromJS({ resource_ids: [1, 2, 3, 4, 5] }),
  setFiltersCache: jest.fn(),
  initialData
};

function setup(initProps) {
  const mockStore = configureStore();
  const store = mockStore({
    initialData
  });
  const component = mount(<SearchSection
    {...initProps}
  />, { context: { store } });

  return {
    component,
    searchIn: component.find('.searchIn'),
    labels: component.find('.filters').find('span'),
    clearFilters: component.find('.clearFilters'),
    disabledClearFilters: component.find('.disabledClearFilters')
  };
}

describe('index/Resource/components/SearchSection', () => {
  it('should render correctly', () => {
    const {
      component,
      searchIn,
      labels,
      clearFilters,
      disabledClearFilters
    } = setup(props);

    expect(searchIn.length).toEqual(1, `searchIn length is ${searchIn.length}, expet is 1`);
    expect(labels.length).toEqual(4, `labels length is ${labels.length}, expet is 5`);
    expect(clearFilters.length).toEqual(1, `clearFilters length is ${clearFilters.length}, expect is 1.`);
    searchIn.simulate('click');

    expect(disabledClearFilters.length).toEqual(0);

    const clearFiltersBtn = component.find('.clearFilters').at(0);
    clearFiltersBtn.simulate('click');
    expect(clearFilter).toHaveBeenCalled();
  });

  it('Show the searchBar when clicking the search in link', () => {
    const nextProps = Object.assign(
      {},
      props,
      { searchSection: fromJS({ showSearchBar: true }) },
      { booking: fromJS({ resource_ids: [] }) }
    );

    const {
      searchIn
    } = setup(nextProps);

    searchIn.simulate('click');
  });

  it('Clear filters should not work well', () => {
    const filtersPropsData = {
      centers: fromJS(mockData),
      eventTypes: fromJS(mockData),
      resourceTypes: fromJS({ ...mockData, ...{ selected: [138, 151] } }),
      facilityTypes: fromJS({ ...mockData, ...{ selected: [1] } }),
      resources: fromJS({
        data: [],
        selected: [],
        error: false,
        loading: false,
        deselectAll: true,
        totalSize: 0,
        errMsg: ''
      })
    };

    const nextFiltersProps = Object.assign(
      {},
      filtersPropsData,
      {
        resourceTypes: fromJS({ ...mockData, ...{ selected: [] } }),
        facilityTypes: fromJS({ ...mockData, ...{ selected: [] } })
      }
    );
    const nextProps = Object.assign({}, props, { filters: nextFiltersProps });
    const { component, disabledClearFilters } = setup(nextProps);

    expect(disabledClearFilters.length).toEqual(1);
    component.setProps({ searchSection: fromJS(searchSection) });
  });
});
