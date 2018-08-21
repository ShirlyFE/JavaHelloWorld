import React from 'react';
import classNames from 'classnames';
import Survey from 'react-base-ui/lib/components/Survey';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import * as helper from './helper';
import { APIQuestionFormat, APIQuestionType } from './consts';

import './index.less';

class AUISurvey extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      shown: true
    };
  }

  addQuestion = () => {
    const { addQuestion, addQuestionList } = this.props;
    if (!count(addQuestionList)) {
      return;
    }
    addQuestion();
  }

  render() {
    const {
      questions,
      changeQuestion,
      deleteQuestion,
      isQuestionsChanged,
      showQuestions,
      containerClassName,
      readOnly,
      canDelete,
      addableQuestionsLoaded,
      addQuestionList,
      permitID
    } = this.props;

    let addQuestionsLength = 0;
    const isReservationDetail = permitID > 0;
    if (isReservationDetail && addQuestionList) {
      addQuestionsLength = count(addQuestionList);
    }

    let data = helper.transformQuestions(
      helper.getShownQuestions(questions), canDelete, readOnly);

    if (addableQuestionsLoaded) {
      data = helper.transformAddQuestions(addQuestionList, data, canDelete, readOnly);
    }

    return (
      <div>
        {
          showQuestions &&
            (<div className={classNames('survey-container', { containerClassName, panel: !isReservationDetail })}>
              <h3 className="survey-header">
                  Custom Question
                  {
                    isQuestionsChanged && <span className="update-changed-label">UPDATED</span>
                  }
                <i
                  className={`icon ${this.state.shown ? 'icon-chevron-up' : 'icon-chevron-down'}`}
                  onClick={() => this.setState({ shown: !this.state.shown })}
                />
              </h3>
              <div className="header-section">
                <div>
                  <span>QUESTION DESCRIPTION</span>
                  {
                      isReservationDetail && !addableQuestionsLoaded &&
                      (
                        <span
                          className={classNames('header-section__add-link', { 'is-disabled': !addQuestionsLength })}
                          onClick={this.addQuestion}
                        >
                          <i className="icon icon-plus" />
                          Add custom question
                        </span>
                      )
                    }

                </div>
              </div>
              <div
                className={classNames('survey-body', { 'u-hidden': !this.state.shown })}
              >
                <Survey
                  data={data}
                  onChange={({ path, value }) =>
                    changeQuestion({ questionPath: path, answer: value })}
                  onIconClick={({ path }) => deleteQuestion({ questionPath: path })}
                />
              </div>
            </div>)
        }
      </div>
    );
  }
}

export default AUISurvey;

export {
  AUISurvey,
  helper,
  APIQuestionFormat,
  APIQuestionType
};
