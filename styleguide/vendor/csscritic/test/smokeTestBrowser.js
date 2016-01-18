// Don't care about the examples
csscritic.addReporter(csscritic.NiceReporter())
    .component('some component')
    .add('pageThatDoesNotExist')
    .add('yetAnotherPageThatDoesNotExist')
    .execute();
