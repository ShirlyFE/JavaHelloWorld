import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import GeneralInformation from 'index/ReservationDetail/components/GeneralInformation/index';
import jsonfBalanceDueDetail from 'json/ReservationDetail/fetchBalanceDueDetail.json';

const mockData = {
  general_information: {
    company_name: '',
    customer_name: 'Mr. Raymond Commercial',
    customer_type: 'Commercial',
    permit_date: '2016 Nov 18',
    system_user: 'ActiveNet Admin',
    balance_due_detail: {
      rental_charges: 8.34,
      taxes: 2.49,
      deposit_claims: 0.00,
      charge_discounts: -1.00,
      rental_charge_payments_credits: -9.83,
      rental_charges_balance_due: 0.00,
      deposits: 8.34,
      deposit_taxes: 2.49,
      deposit_discounts: -1.00,
      deposit_payments_credits: -9.83,
      rental_charge_refunds: 0.83,
      deposit_refunds: 0.00,
      deposit_balance_due: 0.00,
      total_balance_due: 1.00
    }
  },
  payment_plan_information: {
    payer_name: 'Mr. Raymond Commercial',
    number_of_payment: 6,
    next_due_date: 'Dec 12, 2016 ',
    next_due_amount: 20.00,
    payment_method: 'Master Card ends in 1232',
    over_due_amount: 19.66
  },
  action_bar_information: {
    change_permit_status: {
      current_status: { value: 0 }
    }
  }
};
const initData = convertCasingPropObj(mockData);
const balanceDueDetail = convertCasingPropObj(jsonfBalanceDueDetail.body.balance_due_detail);

const showTotalBalanceDueDetail = jest.fn();
const initialData = {
  companyWording: ''
};

const setup = (data) => {

  const output = shallow(<GeneralInformation
    initialData={initialData}
    reservationDetail={data}
    balanceDueDetail={balanceDueDetail}
    isShowTotalBalanceDueDetail
    fetchBalanceDueDetailAsyncAction={() => Promise.resolve()}
    showTotalBalanceDueDetail={showTotalBalanceDueDetail}
    pos={fromJS({ x: 300, y: 300 })}
  />);

  const GeneralInformationDOM = mount(<GeneralInformation
    initialData={initialData}
    reservationDetail={data}
    balanceDueDetail={balanceDueDetail}
    isShowTotalBalanceDueDetail={false}
    fetchBalanceDueDetailAsyncAction={() => Promise.resolve()}
    showTotalBalanceDueDetail={showTotalBalanceDueDetail}
    pos={fromJS({ x: 300, y: 300 })}
  />);

  return {
    actns: { showTotalBalanceDueDetail() { } },
    output,
    GeneralInformationDOM
  };
};

describe('index -> ReservationDetail -> components -> GeneralInformation', () => {
  it('should include 6 divs with having a class named item after rendered', (done) => {
    const { GeneralInformationDOM } = setup(initData);
    jest.runAllTimers();
    setTimeout(() => {
      expect(GeneralInformationDOM.find('.customerInfo').find('.item').length).toBe(19);
      GeneralInformationDOM.find('.pop-base').simulate('mouseout');
      expect(showTotalBalanceDueDetail).toHaveBeenCalledTimes(1);
      GeneralInformationDOM.find('.pop-base').simulate('mouseover');
      expect(showTotalBalanceDueDetail).toHaveBeenCalledTimes(2);

      done();
    }, 0);
  });

  it('The detail of total balance due should be hidden', (done) => {
    initData.generalInformation.companyName = 'test';
    const { GeneralInformationDOM } = setup(initData);
    jest.runAllTimers();
    setTimeout(() => {
      const balanceDueDetail = GeneralInformationDOM.find('.balanceDueDetail').at(0);
      expect(balanceDueDetail.hasClass('u-hidden')).toBe(true);
      done();
    });
    initData.generalInformation.companyName = '';
  });

  it('when nextDueDate and paymentMethod equal to "" should work fine', () => {
    const nextData = {
      ...initData,
      paymentPlanInformation: {
        payerMame: 'Mr. Raymond Commercial',
        numberOfPayment: 6,
        nextDueDate: '',
        nextDueAmount: 0,
        paymentMethod: '',
        overDueAmount: 19.66
      }
    };

    const { GeneralInformationDOM } = setup(nextData);
    expect(GeneralInformationDOM.find('.paymentPlan')).toHaveLength(1);
  });
});
