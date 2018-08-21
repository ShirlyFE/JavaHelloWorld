import {
  getCardTypeSystemIdByCardTypeId,
  getValidCardTypeId,
  getCardTypeSystemIdByName,
  getCardTypeIdByName,
  formatExpirationDate,
  maskCard
} from 'index/Payment/utils/creditCardHelper';

describe('index/Payment/utils/creditCardHelper', () => {
  const creditCardTypeList = [
    { id: 122, card_type_id: 1, card_type: 'Visa' },
    { id: 219, card_type_id: 2, card_type: 'MasterCard' }
  ];

  it('getCardTypeSystemIdByCardTypeId method should work fine', () => {
    expect(getCardTypeSystemIdByCardTypeId(2, creditCardTypeList)).toEqual(219);
    expect(getCardTypeSystemIdByCardTypeId(3, creditCardTypeList)).toEqual(3);
  });

  it('getValidCardTypeId method should work fine', () => {
    expect(getValidCardTypeId(2, creditCardTypeList)).toEqual(2);
    expect(getValidCardTypeId(3, creditCardTypeList)).toEqual(0);
  });

  it('getCardTypeSystemIdByName method should work fine', () => {
    expect(getCardTypeSystemIdByName('MasterCard', creditCardTypeList)).toEqual(219);
    expect(getCardTypeSystemIdByName('JCB', creditCardTypeList)).toEqual(0);
  });

  it('getCardTypeIdByName method should work fine', () => {
    expect(getCardTypeIdByName('MasterCard', creditCardTypeList)).toEqual(2);
    expect(getCardTypeIdByName('JCB', creditCardTypeList)).toEqual(0);
  });

  it('formatExpirationDate method should work fine', () => {
    expect(formatExpirationDate(5, 18)).toEqual('05/18');
    expect(formatExpirationDate(11, 18)).toEqual('11/18');
  });

  it('maskCard method should work fine', () => {
    expect(maskCard('')).toEqual('');
    expect(maskCard('772')).toEqual('xxx772');
    expect(maskCard('6227003818130876221')).toEqual('xxx6221');
  });
});
