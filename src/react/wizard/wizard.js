// eslint-disable-next-line no-unused-vars
import React from 'react';
import types from 'prop-types';
import {PrimaryButton} from '../buttons';
import {Icon} from '../iconography';
import classnames from 'classnames';

function noop() {
}

export class Wizard extends React.Component {
  static propTypes = {
    pages: types.array.isRequired,
    cancel: types.func,
    cancelText: types.string,
    finish: types.func,
    finishText: types.string,
    saving: types.bool,
    savingText: types.string
  };

  static defaultProps = {
    pages: [],
    cancelText: 'Cancel',
    finish: noop,
    finishText: 'Finish',
    saving: false,
    savingText: 'Saving'
  };

  constructor(props) {
    super(props);
    this.state = {currentPage: 0};
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickFinish = this.onClickFinish.bind(this);
    this.setState = this.setState.bind(this);
    this.getPage = this.getPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  getPage() {
    return this.state.currentPage;
  }

  setPage(page) {
    this.setState({currentPage: Math.min(this.props.pages.length - 1, Math.max(0, page))});
  }

  onClickCancel() {
    this.props.cancel();
  }

  onClickBack() {
    const {currentPage} = this.state;
    const {pages} = this.props;
    const page = pages[currentPage];
    const {onClickBack} = page;

    const customPage = onClickBack ? onClickBack() : null;
    const target = typeof customPage === 'number' ? customPage : currentPage - 1;
    this.setPage(target);
  }

  onClickNext() {
    const {currentPage} = this.state;
    const {pages} = this.props;
    const page = pages[currentPage];
    const {onClickNext} = page;

    onClickNext && onClickNext();

    this.setState({currentPage: this.state.currentPage + 1});
  }

  onClickFinish() {
    this.props.finish();
  }

  render() {
    const {cancel, cancelText, className, pages, finishText, style, saving, savingText} = this.props;
    const {currentPage} = this.state;

    const page = pages[currentPage];
    const {
      hideBackButton, hideNextButton, hideFinishButton, nextText = () => 'Next', backComponent, finishComponent
    } = page;

    const lastPage = currentPage >= pages.length - 1;
    const firstPage = currentPage === 0;

    const nextDisabled = page.nextEnabled ? !page.nextEnabled(this.getPage) : false;

    const {onClickNext, setPage, getPage} = this;
    const renderedPage = page.render({onClickNext, setPage, getPage});

    const cancelButton = (
      <PrimaryButton alt className="wizard-cancel-btn"
                     onClick={this.onClickCancel}>{cancelText}</PrimaryButton>
    );

    const backButton = backComponent || (
        <PrimaryButton alt className="wizard-back-btn" disabled={saving}
                       onClick={this.onClickBack}>Back</PrimaryButton>
      );

    const icon = saving && <Icon src="spinner-sm"/>;
    const finishButton = finishComponent || (
        <PrimaryButton {...{
          className: 'wizard-finish-btn',
          icon,
          onClick: this.onClickFinish
        }}>{saving ? savingText : finishText}</PrimaryButton>
      );

    const nextButton = (
      <PrimaryButton className="wizard-next-btn" disabled={nextDisabled}
                     onClick={this.onClickNext}>{nextText()}</PrimaryButton>
    );

    return (
      <div {...{className: classnames('wizard', className), style}}>
        <div className="wizard-page">
          {renderedPage}
        </div>
        <div className="wizard-footer grid ptxl">
          <div className="col">
            {cancel && cancelButton}
            {!firstPage && !hideBackButton && backButton}
          </div>
          <div className="col col-fixed">
            {!lastPage && !hideNextButton && nextButton}
            {lastPage && !hideFinishButton && finishButton}
          </div>
        </div>
      </div>
    );
  }
}