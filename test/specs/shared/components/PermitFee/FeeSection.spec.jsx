/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount } from 'enzyme';
import FeeSection from 'shared/components/PermitFee/FeeSection';

const defaultProps = {
  newEntryID: 0,
  facilityFees: [{
    facilityID: 36,
    transactionID: 0,
    facilityName: 'Gym 1',
    scheduleFees: [{
      facilityScheduleID: 23523,
      masterFacilityScheduleID: 0,
      facilitySchedule: {
        startDate: '14 Feb 2017',
        startTime: '4:00 AM',
        endDate: '14 Feb 2017',
        endTime: '5:00 AM'
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
      facilityScheduleID: 0,
      masterFacilityScheduleID: 0,
      facilitySchedule: null,
      scheduleAmount: 0,
      facilityCharges: []
    }
  }],
  addChargeAuth: false,
  deleteChargeAuth: false,
  editChargeAuth: false,
  feeActionStatus: {
    allowAddFee: false,
    allowDeleteFee: false,
    allowEditFee: false
  },
  allowResetFees: false
};

function setup(props = defaultProps) {
  const actions = {
    fetchPermitFee: jest.fn(),
    permitDetailsChanged: jest.fn(),
    deleteReservationFeeDetail: () => {
      return new Promise((resolve, reject) => {
        resolve();
      })
    },
    resetFeeAsyncAction: jest.fn().mockReturnValue(Promise.resolve())    
  };

  actions.deleteReservationFeeDetail.then = (callback) => {callback()};

  const component = mount(
    <FeeSection {...props} {...actions}></FeeSection>
  );

  const instance = component.instance();

  return {
    component,
    instance,
    facilityList: component.find('.facility-list'),
    deleteFeeAlert: component.find('.modal--alert'),
    deleteAlertConfirmBtn: component.find('.btn-strong'),
    actions,
    feeReset: component.find('.permit-fee__reset')    
  };
}

describe('shared/components/PermitFee/FeeSection', function () {
  it('should not be able to edit and delete fee and the fee detail show correctly', function () {
    let {
      component,
      instance,
      facilityList,
      deleteFeeAlert,
      deleteAlertConfirmBtn,
      actions,
      feeReset
    } = setup();

    expect(facilityList.length).toEqual(1);
    expect(deleteFeeAlert.length).toEqual(1);
    expect(deleteAlertConfirmBtn.length).toEqual(1);
    instance.showFeeDeleteAlert({});
    deleteAlertConfirmBtn.simulate('click');
    expect(actions.permitDetailsChanged).toHaveBeenCalled();
    expect(feeReset.hasClass('disabled')).toBe(true);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).not.toHaveBeenCalled();
    component.setProps({
      allowResetFees: true
    });
    expect(feeReset.hasClass('disabled')).toBe(false);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).toHaveBeenCalledTimes(1);
  });
});
