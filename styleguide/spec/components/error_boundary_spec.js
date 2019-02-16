import ErrorBoundary from '../../src/components/error_boundary';

describe('ErrorBoundary', () => {
  let subject, error, info;

  beforeEach(() => {
    error = new Error('some error');
    info = {ComponentStack: 'here'};
    subject = testRender(<ErrorBoundary><div className="hello">hello</div></ErrorBoundary>);
  });

  describe('when an error was caught', () => {
    beforeEach(() => {
      subject.setState({hasError: true, error, info});
    });

    it('renders an error pre tag', () => {
      expect('pre').toHaveText('some error');
    });
  });

  describe('when no error was caught', () => {
    it('renders the children', () => {
      expect('.hello').toHaveText('hello');
    });
  });
});
