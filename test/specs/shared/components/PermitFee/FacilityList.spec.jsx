/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount } from 'enzyme';
import FacilityList from 'shared/components/PermitFee/FacilityList';

const defaultProps = {
  key: 'facility_0_0',
  facilityKey: 'facility_0_0',
  facility: {
    facilityId: 36,
    transactionId: 0,
    facilityName: "Gym 1",
    scheduleFees: [{
      facilityScheduleId: 23523,
      masterFacilityScheduleId: 0,
      facilitySchedule: {
        startDate: "14 Feb 2017",
        startTime: "6:00 AM",
        endDate: "14 Feb 2017",
        endTime: "7:00 AM"
      },
      scheduleAmount: 0,
      facilityCharges: [],
      recurringScheduleFees: [{
        facilityScheduleID: 23524,
        masterFacilityScheduleID: 23523,
        facilitySchedule: {
          startDate: '14 Feb 2017',
          startTime: '4:00 AM',
          endDate: '14 Feb 2017',
          endTime: '5:00 AM'
        },
        scheduleAmount: -10,
        facilityCharges: []
      }]
    }],
    additionalFees: {
      facilityScheduleId: 0,
      masterFacilityScheduleId: 0,
      facilitySchedule: null,
      scheduleAmount: 0,
      facilityCharges: []
    }
  },
  facilityID: 11,
  transactionID: 123,
  facilityScheduleID: 23523,
  facilityChargeID: 5,
  feeActionStatus: {
    allowAddFee: false,
    allowEditFee: false,
    allowDeleteFee: false
  },
  newEntryID: 0
};

function setup(props = defaultProps) {
  const actions = {
    fetchPermitFee: jest.fn(),
    permitDetailsChanged: jest.fn(),
    showWaringAlert: jest.fn(),
  };

  const component = mount(
    <FacilityList {...props} {...actions}></FacilityList>
  );

  return {
    component,
    facilityName: component.find('.facility-list .afx-col-name'),
    scheduleList: component.find('.schedule-list'),
    recurringFees: component.find('.recurring-fees'),
    recurringTitle: component.find('.recurring-title'),
    scheduleFee: component.find('.schedule-fee'),
    recurringShowIcon: component.find('.icon-chevron-down'),
    actions
  };
}

describe('shared/components/PermitFee/FacilityList', function () {
  it('should render facility schedules correctly', function () {
    let {
      scheduleList,
      facilityName,
      recurringFees,
      recurringTitle,
      recurringShowIcon,
      scheduleFee
    } = setup();

    expect(facilityName.text()).toEqual('Gym 1');
    expect(scheduleList.length).toEqual(2);
    expect(recurringFees.length).toEqual(1);
    expect(recurringTitle.length).toEqual(1);
    expect(recurringTitle.text()).toEqual('1 instance(s) of recurring');
    recurringTitle.find('span').at(0).simulate('click');
    recurringShowIcon.simulate('click');
    expect(scheduleFee.length).toEqual(1);
  });

  it('should render correctly without recurring fees', function () {
    let {
      scheduleList,
      facilityName,
      recurringFees,
      recurringTitle,
      recurringShowIcon,
      scheduleFee
    } = setup({
      key: 'facility_0_0',
      facilityKey: 'facility_0_0',
      facility: {
        facilityId: 36,
        transactionId: 0,
        facilityName: "Gym 1",
        scheduleFees: [],
        additionalFees: {
          facilityScheduleId: 0,
          masterFacilityScheduleId: 0,
          facilitySchedule: null,
          scheduleAmount: 0,
          facilityCharges: []
        }
      },
      facilityID: 11,
      transactionID: 123,
      facilityScheduleID: 23523,
      facilityChargeID: 5,
      feeActionStatus: {
        allowAddFee: false,
        allowEditFee: false,
        allowDeleteFee: false
      },
      newEntryID: 0
    });

    expect(scheduleList.length).toEqual(1);
    expect(recurringFees.length).toEqual(0);
  });

  it('render facility if no schedule-list', function () {
    let {
      scheduleList,
      facilityName,
      recurringFees,
      recurringTitle,
      recurringShowIcon,
      scheduleFee
    } = setup(
      { 
        ...defaultProps,
        facility: {
          facilityId: 36,
          transactionId: 0,
          facilityName: "Gym 1",
          scheduleFees: [],
          additionalFees: {
            facilityScheduleId: 0,
            masterFacilityScheduleId: 0,
            facilitySchedule: null,
            scheduleAmount: 0,
            facilityCharges: []
          }
        }
      });

    expect(facilityName.text()).toEqual('Gym 1');
    expect(scheduleList.length).toEqual(1);
    expect(recurringFees.length).toEqual(0);
    expect(recurringTitle.length).toEqual(0);
    expect(scheduleFee.length).toEqual(0);
  });
});
