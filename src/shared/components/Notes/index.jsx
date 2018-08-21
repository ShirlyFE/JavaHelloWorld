import PropTypes from 'prop-types';
import React from 'react';
import { STAFF_NOTE, CUSTOMER_NOTE } from 'shared/consts/noteTypes';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export default class Notes extends UIComponent {

  static propTypes = {
    permitDetailsChanged: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const data = this.props.notes.toJS();
    this.state = {
      [STAFF_NOTE]: data[STAFF_NOTE],
      [CUSTOMER_NOTE]: data[CUSTOMER_NOTE],
      isExpand: data.isExpand,
      isChanged: false
    };
  }

  render() {
    const { showSection } = this.props.notes.toJS();

    return (
      <div className={`notes-section panel ${showSection ? '' : 'u-hidden'}`}>
        <div className="title" >Event Notes <i onClick={this.onToggle} className={`title icon text-color-primary ${this.state.isExpand ? 'icon-chevron-up' : 'icon-chevron-down'}`} />
        </div>
        <div className={`section-container ${this.state.isExpand ? '' : 'u-hidden'}`}>
          <section>
            <label htmlFor="staffNote">
              Staff Note
            </label>
            <textarea
              id="staffNote"
              name="staffNote"
              value={this.state[STAFF_NOTE]}
              maxLength="20000"
              className={this.props.readOnly ? 'textarea-disabled' : ''}
              disabled={this.props.readOnly}
              onChange={e => this.onChange(STAFF_NOTE, e)}
              onBlur={e => this.updateNote(STAFF_NOTE, e)}
            />
          </section>
          <section>
            <label htmlFor="customerNote">
              Customer Note
            </label>
            <textarea
              id="customerNote"
              name="customerNote"
              value={this.state[CUSTOMER_NOTE]}
              maxLength="20000"
              className={this.props.readOnly ? 'textarea-disabled' : ''}
              disabled={this.props.readOnly}
              onChange={e => this.onChange(CUSTOMER_NOTE, e)}
              onBlur={e => this.updateNote(CUSTOMER_NOTE, e)}
            />
          </section>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.notes.toJS();

    this.setState({
      [STAFF_NOTE]: data[STAFF_NOTE] || '',
      [CUSTOMER_NOTE]: data[CUSTOMER_NOTE] || '',
      // data.isExpand is for modify reservation detail page
      // this.state.isExpand is for new reservation detail page
      isExpand: data.isExpand || this.state.isExpand || false,
      isChanged: false
    });
  }

  onToggle = () => {
    const isExpand = this.state.isExpand;
    this.setState({
      isExpand: !isExpand
    });
  };

  onChange = (noteType, e) => {
    const text = e.target.value.substr(0, 20000);
    this.setState({
      [noteType]: text,
      isChanged: true
    });
  };

  updateNote = (nodeType, e) => {
    const text = e.target.value;
    const { eventID, newEntryID, eventIndex } = this.props;

    if (this.state.isChanged) {
      this.props.saveNotes({
        note_text: text,
        note_type: nodeType,
        event_index: eventIndex,
        new_entry_id: newEntryID,
        event_id: eventID
      }).then(this.onNotesSaved);
    }
  }

  onNotesSaved = () => {
    const { showUpdated, setActionBarDisabled, permitDetailsChanged } = this.props;
    this.setState({
      isChanged: false
    }, () => {
      showUpdated && showUpdated(this.props.eventIndex);
      setActionBarDisabled && setActionBarDisabled();
      permitDetailsChanged && permitDetailsChanged();
    });
  }
}
