import '../../spec_helper';
import {Table, withRowDrawer, withFlex} from '../../../../src/react/table';

describe('withRowDrawer', () => {
  let ComposedTable, columns, data, subject;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }, {
      attr1: 'row3-value1', attr2: 'row3-value2'
    }];
    ComposedTable = withRowDrawer(withFlex(Table));
  });

  describe('without rowDrawer', () => {
    beforeEach(() => {
      subject = shallow(<ComposedTable {...{columns, data}}/>);
    });

    it('the first column does not have an > icon', () => {
      expect(subject.find('.thead .tr').at(0).find('.th').at(0).find('svg').exists()).toBeFalsy();
      expect(subject.find('.table .tr').at(0).find('.td').at(0).find('svg').exists()).toBeFalsy();
      expect(subject.find('.tbody .tr').at(1).find('.td').at(0).find('svg').exists()).toBeFalsy();
    });

    it('none of the rows has expandable class', () => {
      expect(subject.find('.expandable').exists()).toBeFalsy();
    });
  });

  describe('with rowDrawer', () => {
    let rowDrawer;

    beforeEach(() => {
      rowDrawer = jest.fn().mockName('rowDrawer');
    });

    describe('without drawer content', () => {
      beforeEach(() => {
        subject = shallow(<ComposedTable {...{columns, data, rowDrawer, keyboardNavigation: true}}/>);
      });

      it('renders a header row without "no-drawer-content"', () => {
        expect(subject.find('.thead > div').at(0).find('> .tr').hasClass('no-drawer-content')).toBeFalsy();
      });

      it('renders an empty th for the first column in the header', () => {
        expect(subject.find('.thead > div').at(0).find('> .tr > div').at(0).hasClass('th')).toBeTruthy();
        expect(subject.find('.thead > div').at(0).find('> .tr > div').at(0).hasClass('col')).toBeTruthy();
        expect(subject.find('.thead > div').at(0).find('> .tr > div').at(0).hasClass('col-fixed')).toBeTruthy();
        expect(subject.find('.thead > div').at(0).find('> .tr > div').at(0).prop('style')).toEqual({borderRightWidth: '0px', width: '36px'});
      });

      it('renders an > icon on the first column', () => {
        expect(subject.find('.thead .tr').at(0).find('.th').at(0).find('svg').exists()).toBeFalsy();
        expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
        expect(subject.find('.tbody .tr').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
      });

      it('body rows has an expandable class', () => {
        expect(subject.find('.thead .tr').at(0).hasClass('expandable')).toBeFalsy();
        expect(subject.find('.tbody .tr').at(0).hasClass('expandable')).toBeTruthy();
        expect(subject.find('.tbody .tr').at(1).hasClass('expandable')).toBeTruthy();
      });

      it('has collapsed rows', () => {
        expect(subject.find('.tbody > div').at(0).find('.pui-collapsible').hasClass('in')).toBeFalsy();
        expect(subject.find('.tbody > div').at(1).find('.pui-collapsible').hasClass('in')).toBeFalsy();
      });

      describe('when clicking a row', () => {
        beforeEach(() => {
          subject.find('.tbody .tr').at(0).simulate('click');
        });

        it('does not expand the row', () => {
          expect(subject.find('.tbody > div').at(0).find('.pui-collapsible').hasClass('in')).toBeFalsy();
        });

        it('does not change the icon from > to chevron_down', () => {
          expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_down')).toBeFalsy();
          expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
          expect(subject.find('.tbody .tr').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
        });
      });

      describe('keyboardNavigation', () => {
        function keyDown(key) {
          const event = document.createEvent('Event');
          event.keyCode = key;
          event.initEvent('keydown');
          document.dispatchEvent(event);
        }

        it('initially has no selectedRow', () => {
          expect(subject.find('.tr-selected').exists()).toBeFalsy();
        });

        describe('when pressing down (keyCode=40)', () => {
          beforeEach(() => {
            keyDown(40);
          });

          it('selects the first row', () => {
            expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
          });

          describe('when pressing right (keyCode=39)', () => {
            beforeEach(() => {
              keyDown(39);
            });

            it('expands the first row', () => {
              expect(subject.find('.tr').at(1).hasClass('expanded')).toBeFalsy();
            });
          });

          describe('when pressing up (keyCode=38)', () => {
            beforeEach(() => {
              keyDown(38);
            });

            it('selects the first row', () => {
              expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
            });
          });

          describe('when pressing down (keyCode=40)', () => {
            beforeEach(() => {
              keyDown(40);
            });

            it('selects the second row', () => {
              expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
            });

            describe('when pressing up (keyCode=38)', () => {
              beforeEach(() => {
                keyDown(38);
              });

              it('selects the first row', () => {
                expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
              });
            });

            describe('when pressing down (keyCode=40)', () => {
              beforeEach(() => {
                keyDown(40);
              });

              it('selects the third row', () => {
                expect(subject.find('.tr').at(3).hasClass('tr-selected')).toBeTruthy();
              });

              describe('when pressing up (keyCode=38)', () => {
                beforeEach(() => {
                  keyDown(38);
                });

                it('selects the second row', () => {
                  expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
                });
              });

              describe('when pressing down (keyCode=40)', () => {
                beforeEach(() => {
                  keyDown(40);
                });

                it('remains on the third row', () => {
                  expect(subject.find('.tr').at(3).hasClass('tr-selected')).toBeTruthy();
                });

                describe('when pressing up (keyCode=38)', () => {
                  beforeEach(() => {
                    keyDown(38);
                  });

                  it('selects the second row', () => {
                    expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('with drawer content', () => {
      beforeEach(() => {
        rowDrawer.mockReturnValue('some-drawer-content');
        subject = shallow(<ComposedTable {...{columns, data, rowDrawer, keyboardNavigation: true}}/>);
      });

      it('calls rowDrawer with the correct arguments', () => {
        expect(rowDrawer).toHaveBeenCalledWith(0, {attr1: 'row1-value1', attr2: 'row1-value2'});
        expect(rowDrawer).toHaveBeenCalledWith(1, {attr1: 'row2-value1', attr2: 'row2-value2'});
        expect(rowDrawer).toHaveBeenCalledWith(2, {attr1: 'row3-value1', attr2: 'row3-value2'});
      });

      it('renders an > icon on the first column', () => {
        expect(subject.find('.thead .tr').at(0).find('.th').at(0).find('svg').exists()).toBeFalsy();
        expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
        expect(subject.find('.tbody .tr').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
      });

      it('body rows has an expandable class', () => {
        expect(subject.find('.thead .tr').at(0).hasClass('expandable')).toBeFalsy();
        expect(subject.find('.tbody .tr').at(0).hasClass('expandable')).toBeTruthy();
        expect(subject.find('.tbody .tr').at(1).hasClass('expandable')).toBeTruthy();
      });

      it('has collapsed rows', () => {
        expect(subject.find('.tbody > div').at(0).find('.pui-collapsible').hasClass('in')).toBeFalsy();
        expect(subject.find('.tbody > div').at(1).find('.pui-collapsible').hasClass('in')).toBeFalsy();
      });

      describe('when clicking a row', () => {
        beforeEach(() => {
          subject.find('.tbody .tr').at(0).simulate('click');
        });

        it('expands the row', () => {
          expect(subject.find('.tbody > div').at(0).find('.pui-collapsible').hasClass('in')).toBeTruthy();
        });

        it('changes the icon from > to chevron_down', () => {
          expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_down')).toBeTruthy();
          expect(subject.find('.tbody .tr').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
        });

        describe('when clicking an expanded row', () => {
          beforeEach(() => {
            subject.find('.tbody .tr').at(0).simulate('click');
          });

          it('collapses that row', () => {
            expect(subject.find('.tbody > div').at(0).find('.pui-collapsible').hasClass('in')).toBeFalsy();
          });

          it('changes the chevron_down back to >', () => {
            expect(subject.find('.tbody .tr').at(0).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
            expect(subject.find('.tbody .tr').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
          });
        });
      });

      describe('keyboardNavigation', () => {
        function keyDown(key) {
          const event = document.createEvent('Event');
          event.keyCode = key;
          event.initEvent('keydown');
          document.dispatchEvent(event);
        }

        it('initially has no selectedRow', () => {
          expect(subject.find('.tr-selected').exists()).toBeFalsy();
        });

        describe('when pressing down (keyCode=40)', () => {
          beforeEach(() => {
            keyDown(40);
          });

          it('selects the first row', () => {
            expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
          });

          describe('when pressing right (keyCode=39)', () => {
            beforeEach(() => {
              rowDrawer.mockReset();
              keyDown(39);
            });

            it('expands the first row', () => {
              expect(subject.find('.tr').at(1).hasClass('expanded')).toBeTruthy();
            });

            it('calls the rowDrawer function with the correct arguments', () => {
              expect(rowDrawer.calls.first().args).toEqual([0, {attr1: 'row1-value1', attr2: 'row1-value2'}]);
            });

            describe('when pressing left (keyCode=37)', () => {
              beforeEach(() => {
                keyDown(37);
              });

              it('collapses the first row', () => {
                expect(subject.find('.tr').at(1).hasClass('expanded')).toBeFalsy();
              });
            });
          });

          describe('when pressing up (keyCode=38)', () => {
            beforeEach(() => {
              keyDown(38);
            });

            it('selects the first row', () => {
              expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
            });
          });

          describe('when pressing down (keyCode=40)', () => {
            beforeEach(() => {
              keyDown(40);
            });

            it('selects the second row', () => {
              expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
            });

            describe('when pressing up (keyCode=38)', () => {
              beforeEach(() => {
                keyDown(38);
              });

              it('selects the first row', () => {
                expect(subject.find('.tr').at(1).hasClass('tr-selected')).toBeTruthy();
              });
            });

            describe('when pressing down (keyCode=40)', () => {
              beforeEach(() => {
                keyDown(40);
              });

              it('selects the third row', () => {
                expect(subject.find('.tr').at(3).hasClass('tr-selected')).toBeTruthy();
              });

              describe('when pressing up (keyCode=38)', () => {
                beforeEach(() => {
                  keyDown(38);
                });

                it('selects the second row', () => {
                  expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
                });
              });

              describe('when pressing down (keyCode=40)', () => {
                beforeEach(() => {
                  keyDown(40);
                });

                it('remains on the third row', () => {
                  expect(subject.find('.tr').at(3).hasClass('tr-selected')).toBeTruthy();
                });

                describe('when pressing up (keyCode=38)', () => {
                  beforeEach(() => {
                    keyDown(38);
                  });

                  it('selects the second row', () => {
                    expect(subject.find('.tr').at(2).hasClass('tr-selected')).toBeTruthy();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});