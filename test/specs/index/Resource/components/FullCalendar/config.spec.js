import data, {
  bookingStatusColorMap
} from 'index/Resource/components/FullCalendar/config';
import Globalize from 'react-base-ui/lib/services/i18n';

const expectData = {
  header: false,
  views: {
    resourceDay: {
      buttonText: 'Day'
    }
  },
  titleFormat: Globalize.ANDateFormat,
  defaultView: 'resourceDay',
  selectWireframeShow: true,
  slotEventOverlap: false,
  scrollTime: '08:00',
  minTime: '00:00:00',
  maxTime: '24:00:00',
  slotWidth: 2,
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  snapDuration: '00:15:00',
  businessHours: {
    start: '08:00:00',
    end: '18:00:00'
  },
  allDaySlot: false,
  firstDay: 1,
  extraFixedScrollBar: 'x', // Just support x now.
  editable: false,
  selectable: true,
  eventLimit: true,
  eventOrder: ['eventName'],
  timeFormat: Globalize.ANTimeFormat,
  slotLableFormat: Globalize.ANTimeFormat,
  columnFormat: Globalize.ANTimeFormat,
  axisFormat: Globalize.ANTimeFormat,
  resourceIdField: 'id',
  extendedGridProps: {
    showNowTimeLine: true
  },
  dragOpacity: 1.0,
  timezone: 'local'
};

export const expectBookingStatusColorMap = {
  Closed: 'grey',
  Completed: 'green',
  Approved: 'green',
  Issued: 'green',
  Tentative: 'yellow',
  'Waiting Decision': 'yellow',
  'On Hold': 'yellow',
  'Stage Denied': 'yellow',
  Pending: 'purple'
};

it('data is works fine', () => {
  expect(data).toEqual(expectData);
  expect(bookingStatusColorMap).toEqual(expectBookingStatusColorMap);
});
