import React from 'react';
import { fromJS } from 'immutable';
import UIComponent from 'shared/components/UIComponent';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import Calendar from 'fullcalendar-resource';

import 'fullcalendar-resource/lib/css/fullcalendar-resource.css';

export default class Fullcalendar extends UIComponent {
  /**
   * Only need to be update when events and resources property are changed.
   * <SetEvents> just rerender events part.
   * <SetResources> will rerender whole current calendar view.
   */
  componentDidUpdate({ events, resources, showBusinessHours, now }) {
    // @resources {Object} - no immutable.
    if (!da.is(fromJS(resources), fromJS(this.props.resources))) {
      this.transferCalling('setResources', this.props.resources);
    }

    // @events {Object} - no immutable.
    if (!da.is(fromJS(events), fromJS(this.props.events))) {
      this.transferCalling('removeEvents');
      this.transferCalling('addEventSource', this.props.events);
    }

    /**
     * This businessHours is different with fullCalendar's businessHours.
     * Using minTime and maxTime to implement our requirement.
     * It's a good way because we don't need to change fullCalendar.
     * showBusinessHours: not used in this version -- 6/27/2017
     */
    if (!!showBusinessHours !== !!this.props.showBusinessHours) {
      let businessHours;
      if (this.props.showBusinessHours) {
        businessHours = {
          start: this.props.businessHours.start,
          end: this.props.businessHours.end
        };
      } else {
        businessHours = {
          start: this.props.minTime,
          end: this.props.maxTime
        };
      }
      this.setOption('setOption', 'minTime', businessHours.start, false);
      this.setOption('setOption', 'maxTime', businessHours.end, true);
    }
    if (now !== this.props.now) {
      this.setOption('setOption', 'now', now, true);
    }
  }

  componentDidMount() {
    const settings = $.extend({}, this.props);
    if (!settings.showBusinessHours) {
      settings.businessHours = false;
    }
    this.calendar = new Calendar($(this.calendarDiv), settings);
    this.calendar.render();
  }

  componentWillUnmount() {
    $(this.calendarDiv).remove();
  }

  setOption = (...params) => {
    const needRerender = params.splice(-1)[0];
    this.transferCalling(...params);
    if (needRerender) {
      this.transferCalling('rerender');
    }
  };

  transferCalling = (...params) => {
    const [method, ...rest] = params;
    return this.calendar[method](...rest);
  };

  updateTitle = (title) => {
    this.setState({ currentShowDate: title });
  };

  render() {
    return (
      <div>
        <div ref={(c) => { this.calendarDiv = c; }} />
      </div>
    );
  }
}
