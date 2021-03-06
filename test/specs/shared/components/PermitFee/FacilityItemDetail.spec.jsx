/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount } from 'enzyme';
import FacilityItemDetail from 'shared/components/PermitFee/FacilityItemDetail';

const defaultProps = {
  key: 'detailFee_5_0',
  facilityID: 11,
  transactionID: 123,
  facilityScheduleID: 23523,
  facilityChargeID: 5,
  feeActionStatus: {
    allowEditFee: false,
    allowDeleteFee: false
  },
  detailFee: {
    facilityChargeId: 5,
    chargeName: 'FaciltiyPer hour',
    quantity: 1,
    unitFee: 20,
    abbrevUnitOfMeasure: '/ hr',
    amount: 16.66,
    permitId: 0,
    receiptDetailId: 0,
    facilityScheduleId: 23524,
    isPercentageDiscount: false
  },
  newEntryID: 0,
  receiptDetailID: 0,
  permitID: 0
};

function setup(props = defaultProps) {
  const actions = {
    onAddNewCharge: jest.fn(),
    showWaringAlert: jest.fn()
  };

  const component = mount(
    <FacilityItemDetail {...props} {...actions}></FacilityItemDetail>
  );

  return {
    component,
    feeChargeName: component.find('.facility-fee'),
    detailFeeCharge: component.find('.item-fee-detail'),
    feeAmount: component.find('.fee-amount'),
    editFee: component.find('.icon-sign-m'),
    deleteFee: component.find('.icon-trash'),
    actions
  };
}

describe('shared/components/PermitFee/FacilityItemDetail', function () {
  it('should not be able to edit and delete fee and the fee detail show correctly', function () {
    let {
      feeChargeName,
      detailFeeCharge,
      feeAmount,
      editFee,
      deleteFee
    } = setup();

    expect(feeChargeName.text()).toEqual(defaultProps.detailFee.chargeName);
    expect(detailFeeCharge.text()).toEqual('$20.00 / hr x 1');
    expect(feeAmount.text()).toEqual('$16.66');
    expect(editFee.length).toEqual(0);
    expect(deleteFee.length).toEqual(0);
  });

  it('should be able to edit and delete fee and the fee detail show correctly', function () {
    let {
      detailFeeCharge,
      editFee,
      deleteFee,
      actions
    } = setup({
      ...defaultProps,
      feeActionStatus: {
        allowEditFee: true,
        allowDeleteFee: true
      },
      detailFee: {
        facilityChargeId: 5,
        chargeName: 'FaciltiyPer hour',
        quantity: 1,
        unitFee: 20,
        abbrevUnitOfMeasure: '/ hr',
        amount: 16.66,
        permitId: 0,
        receiptDetailId: 0,
        facilityScheduleId: 23524,
        isPercentageDiscount: true
      }
    });

    expect(detailFeeCharge.text()).toEqual('20.00%');
    expect(editFee.length).toEqual(1);
    expect(deleteFee.length).toEqual(1);
    editFee.simulate('click');
    expect(actions.onAddNewCharge).toHaveBeenCalled();
    deleteFee.simulate('click');
    expect(actions.showWaringAlert).toHaveBeenCalled();
  });

  it('should be able to edit fee and detail show correctly when permitID > 0', function () {
    let {
      detailFeeCharge,
      editFee,
      deleteFee,
      actions
    } = setup({
      ...defaultProps,
      feeActionStatus: {
        allowEditFee: true,
        allowDeleteFee: false
      },
      detailFee: {
        facilityChargeId: 5,
        chargeName: 'FaciltiyPer hour',
        quantity: 1,
        unitFee: 20,
        abbrevUnitOfMeasure: '/ hr',
        amount: 16.66,
        permitId: 0,
        receiptDetailId: 0,
        facilityScheduleId: 23524,
        isPercentageDiscount: true
      },
      newEntryID: 1,
      receiptDetailID: 1,
      permitID: 1
    });

    expect(detailFeeCharge.text()).toEqual('20.00%');
    expect(editFee.length).toEqual(1);
    expect(deleteFee.length).toEqual(0);
    editFee.simulate('click');
    expect(actions.onAddNewCharge).toHaveBeenCalled();
  });
});
