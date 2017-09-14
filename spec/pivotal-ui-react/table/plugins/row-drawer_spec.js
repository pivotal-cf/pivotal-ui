import '../../spec_helper';
import {Table, withRowDrawer, withFlex} from '../../../../src/react/table';

describe('withRowDrawer', () => {
  let ComposedTable, columns, data;

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
      ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
    });

    it('the first column does not have an > icon', () => {
      expect('.thead .tr:eq(0) .th:eq(0) svg').not.toExist();
      expect('.table .tr:eq(0) .td:eq(0) svg').not.toExist();
      expect('.tbody .tr:eq(1) .td:eq(0) svg').not.toExist();
    });

    it('none of the rows has expandable class', () => {
      expect('.expandable').not.toExist();
    });
  });

  describe('with rowDrawer', () => {
    let rowDrawer;

    beforeEach(() => {
      rowDrawer = jasmine.createSpy('rowDrawer');
    });

    describe('without drawer content', () => {
      beforeEach(() => {
        ReactDOM.render(<ComposedTable {...{columns, data, rowDrawer, keyboardNavigation: true}}/>, root);
      });

      it('renders a header row without "no-drawer-content"', () => {
        expect('.thead > div:eq(0) > .tr').not.toHaveClass('no-drawer-content');
      });

      it('renders an empty th for the first column in the header', () => {
        expect('.thead > div:eq(0) > .tr > div:eq(0)').toHaveClass('th');
        expect('.thead > div:eq(0) > .tr > div:eq(0)').toHaveClass('col');
        expect('.thead > div:eq(0) > .tr > div:eq(0)').toHaveClass('col-fixed');
        expect('.thead > div:eq(0) > .tr > div:eq(0)').toHaveAttr('style', 'border-right-width: 0px; width: 36px;');
      });

      it('renders an > icon on the first column', () => {
        expect('.thead .tr:eq(0) .th:eq(0) svg').not.toExist();
        expect('.tbody .tr:eq(0) .icon svg').toHaveClass('icon-chevron_right');
        expect('.tbody .tr:eq(1) .icon svg').toHaveClass('icon-chevron_right');
      });

      it('body rows has an expandable class', () => {
        expect('.thead .tr:eq(0)').not.toHaveClass('expandable');
        expect('.tbody .tr:eq(0)').toHaveClass('expandable');
        expect('.tbody .tr:eq(1)').toHaveClass('expandable');
      });

      it('has collapsed rows', () => {
        expect('.tbody > div:eq(0) .collapse').not.toHaveClass('in');
        expect('.tbody > div:eq(1) .collapse').not.toHaveClass('in');
      });

      describe('when clicking a row', () => {
        beforeEach(() => {
          $('.tbody .tr:eq(0)').simulate('click');
        });

        it('does not exand the row', () => {
          expect('.tbody > div:eq(0) .collapse').not.toHaveClass('in');
        });

        it('does not change the icon from > to chevron_down', () => {
          expect('.tbody .tr:eq(0) .icon svg').not.toHaveClass('icon-chevron_down');
          expect('.tbody .tr:eq(0) .icon svg').toHaveClass('icon-chevron_right');
          expect('.tbody .tr:eq(1) .icon svg').toHaveClass('icon-chevron_right');
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
          expect('.tr-selected').not.toExist();
        });

        describe('when pressing down (keyCode=40)', () => {
          beforeEach(() => {
            keyDown(40);
          });

          it('selects the first row', () => {
            expect('.tr:eq(1)').toHaveClass('tr-selected');
          });

          describe('when pressing right (keyCode=39)', () => {
            beforeEach(() => {
              keyDown(39);
            });

            it('expands the first row', () => {
              expect('.tr:eq(1)').not.toHaveClass('expanded');
            });
          });

          describe('when pressing up (keyCode=38)', () => {
            beforeEach(() => {
              keyDown(38);
            });

            it('selects the first row', () => {
              expect('.tr:eq(1)').toHaveClass('tr-selected');
            });
          });

          describe('when pressing down (keyCode=40)', () => {
            beforeEach(() => {
              keyDown(40);
            });

            it('selects the second row', () => {
              expect('.tr:eq(2)').toHaveClass('tr-selected');
            });

            describe('when pressing up (keyCode=38)', () => {
              beforeEach(() => {
                keyDown(38);
              });

              it('selects the first row', () => {
                expect('.tr:eq(1)').toHaveClass('tr-selected');
              });
            });

            describe('when pressing down (keyCode=40)', () => {
              beforeEach(() => {
                keyDown(40);
              });

              it('selects the third row', () => {
                expect('.tr:eq(3)').toHaveClass('tr-selected');
              });

              describe('when pressing up (keyCode=38)', () => {
                beforeEach(() => {
                  keyDown(38);
                });

                it('selects the second row', () => {
                  expect('.tr:eq(2)').toHaveClass('tr-selected');
                });
              });

              describe('when pressing down (keyCode=40)', () => {
                beforeEach(() => {
                  keyDown(40);
                });

                it('remains on the third row', () => {
                  expect('.tr:eq(3)').toHaveClass('tr-selected');
                });

                describe('when pressing up (keyCode=38)', () => {
                  beforeEach(() => {
                    keyDown(38);
                  });

                  it('selects the second row', () => {
                    expect('.tr:eq(2)').toHaveClass('tr-selected');
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
        rowDrawer.and.returnValue('some-drawer-content');
        ReactDOM.render(<ComposedTable {...{columns, data, rowDrawer, keyboardNavigation: true}}/>, root);
      });

      it('renders an > icon on the first column', () => {
        expect('.thead .tr:eq(0) .th:eq(0) svg').not.toExist();
        expect('.tbody .tr:eq(0) .icon svg').toHaveClass('icon-chevron_right');
        expect('.tbody .tr:eq(1) .icon svg').toHaveClass('icon-chevron_right');
      });

      it('body rows has an expandable class', () => {
        expect('.thead .tr:eq(0)').not.toHaveClass('expandable');
        expect('.tbody .tr:eq(0)').toHaveClass('expandable');
        expect('.tbody .tr:eq(1)').toHaveClass('expandable');
      });

      it('has collapsed rows', () => {
        expect('.tbody > div:eq(0) .collapse').not.toHaveClass('in');
        expect('.tbody > div:eq(1) .collapse').not.toHaveClass('in');
      });

      describe('when clicking a row', () => {
        beforeEach(() => {
          $('.tbody .tr:eq(0)').simulate('click');
        });

        it('expands the row', () => {
          expect('.tbody > div:eq(0) .collapse').toHaveClass('in');
        });

        it('changes the icon from > to chevron_down', () => {
          expect('.tbody .tr:eq(0) .icon svg').toHaveClass('icon-chevron_down');
          expect('.tbody .tr:eq(1) .icon svg').toHaveClass('icon-chevron_right');
        });

        describe('when clicking an expanded row', () => {
          beforeEach(() => {
            $('.tbody .tr:eq(0)').simulate('click');
          });

          it('collapses that row', () => {
            expect('.tbody > div:eq(0) .collapse').not.toHaveClass('in');
          });

          it('changes the chevron_down back to >', () => {
            expect('.tbody .tr:eq(0) .icon svg').toHaveClass('icon-chevron_right');
            expect('.tbody .tr:eq(1) .icon svg').toHaveClass('icon-chevron_right');
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
          expect('.tr-selected').not.toExist();
        });

        describe('when pressing down (keyCode=40)', () => {
          beforeEach(() => {
            keyDown(40);
          });

          it('selects the first row', () => {
            expect('.tr:eq(1)').toHaveClass('tr-selected');
          });

          describe('when pressing right (keyCode=39)', () => {
            beforeEach(() => {
              keyDown(39);
            });

            it('expands the first row', () => {
              expect('.tr:eq(1)').toHaveClass('expanded');
            });

            describe('when pressing left (keyCode=37)', () => {
              beforeEach(() => {
                keyDown(37);
              });

              it('collapses the first row', () => {
                expect('.tr:eq(1)').not.toHaveClass('expanded');
              });
            });
          });

          describe('when pressing up (keyCode=38)', () => {
            beforeEach(() => {
              keyDown(38);
            });

            it('selects the first row', () => {
              expect('.tr:eq(1)').toHaveClass('tr-selected');
            });
          });

          describe('when pressing down (keyCode=40)', () => {
            beforeEach(() => {
              keyDown(40);
            });

            it('selects the second row', () => {
              expect('.tr:eq(2)').toHaveClass('tr-selected');
            });

            describe('when pressing up (keyCode=38)', () => {
              beforeEach(() => {
                keyDown(38);
              });

              it('selects the first row', () => {
                expect('.tr:eq(1)').toHaveClass('tr-selected');
              });
            });

            describe('when pressing down (keyCode=40)', () => {
              beforeEach(() => {
                keyDown(40);
              });

              it('selects the third row', () => {
                expect('.tr:eq(3)').toHaveClass('tr-selected');
              });

              describe('when pressing up (keyCode=38)', () => {
                beforeEach(() => {
                  keyDown(38);
                });

                it('selects the second row', () => {
                  expect('.tr:eq(2)').toHaveClass('tr-selected');
                });
              });

              describe('when pressing down (keyCode=40)', () => {
                beforeEach(() => {
                  keyDown(40);
                });

                it('remains on the third row', () => {
                  expect('.tr:eq(3)').toHaveClass('tr-selected');
                });

                describe('when pressing up (keyCode=38)', () => {
                  beforeEach(() => {
                    keyDown(38);
                  });

                  it('selects the second row', () => {
                    expect('.tr:eq(2)').toHaveClass('tr-selected');
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