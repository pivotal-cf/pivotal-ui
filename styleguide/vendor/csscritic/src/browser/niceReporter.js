csscriticLib.niceReporter = function (window, util, selectionFilter, pageNavigationHandlingFallback, rasterizeHTML, packageVersion) {
    "use strict";

    var module = {};

    // our very own templating implementation

    var escapeValue = function (value) {
        return value.toString()
            .replace(/&/g, '&amp;')
            .replace(new RegExp('<'), '&lt;', 'g') // work around https://github.com/cburgmer/inlineresources/issues/2
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    var template = function (templateStr, values) {
        return templateStr.replace(/\{\{(\w+)\}\}/g, function (_, param) {
            var value = values[param] !== undefined ? values[param] : '';
            return escapeValue(value);
        });
    };

    var elementFor = function (htmlString) {
        var tmp = document.createElement('body');
        tmp.insertAdjacentHTML('beforeend', htmlString);
        return tmp.firstChild;
    };

    var findElementIn = function (container, elementClassName) {
        return container.querySelector('.' + elementClassName);
    };

    var escapeId = function (id) {
        return id.replace(/ /g, '_');
    };

    // container

    var headerClassName = 'header',
        timeTakenClassName = 'timeTaken',
        progressBarClassName = 'progressBar',
        statusTextClassName = 'statusText',
        headerOptionalClassName = 'optional';

    var createContainer = function (parentContainer) {
        var reportBody = elementFor('<div class="cssCriticNiceReporter"></div>');

        showHeader(reportBody);

        parentContainer.appendChild(reportBody);

        return reportBody;
    };

    var elementDimensions = function (element) {
        var initialPosition = element.getBoundingClientRect(),
            scrollOffsetTop = document.body.scrollTop || document.documentElement.scrollTop,
            scrollOffsetLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

        return {
            top: initialPosition.top + scrollOffsetTop,
            left: initialPosition.left + scrollOffsetLeft,
            right: initialPosition.right - initialPosition.width + scrollOffsetLeft,
            height: initialPosition.height
        };
    };

    var px = function (value) {
        return value + 'px';
    };

    var makeElementFixedOnScroll = function (element) {
        var scrollingClass = 'scrolling',
            smallClass = 'small',
            smallScrollThreshold = 50,
            isScrolling = false,
            isSmall = false,
            pseudoInlineElement = document.createElement('div'),
            dimensions;

        window.addEventListener("scroll", function () {
            if (window.scrollY > 0) {
                if (! isScrolling) {
                    isScrolling = true;

                    dimensions = elementDimensions(element);

                    element.classList.add(scrollingClass);

                    element.style.position = 'fixed';
                    element.style.top = px(dimensions.top);
                    element.style.left = px(dimensions.left);
                    element.style.right = px(dimensions.right);

                    pseudoInlineElement.style.height = px(dimensions.height);
                    element.parentElement.insertBefore(pseudoInlineElement, element);
                }
                if (! isSmall && window.scrollY > smallScrollThreshold) {
                    isSmall = true;
                    element.classList.add(smallClass);
                } else if (isSmall && window.scrollY <= smallScrollThreshold) {
                    isSmall = false;
                    element.classList.remove(smallClass);
                }
            } else {
                if (isScrolling) {
                    isScrolling = false;

                    element.classList.remove(scrollingClass);
                    element.classList.remove(smallClass);

                    element.style.position = '';
                    element.style.top = '';
                    element.style.left = '';
                    element.style.right = '';

                    element.parentElement.removeChild(pseudoInlineElement);
                }
            }
        });
    };

    var showHeader = function (container) {
        var header = elementFor(template('<header class="{{headerClassName}}">' +
                                         '<span class="{{timeTakenClassName}}"></span>' +
                                         '<a href="http://cburgmer.github.io/csscritic/" class="cssCriticVersion">' +
                                         'CSS Critic {{packageVersion}}' +
                                         '</a>' +
                                         '<ul class="{{progressBarClassName}}"></ul>' +
                                         '<div class="{{headerOptionalClassName}}">' +
                                         '<div class="{{statusTextClassName}}" class="statusText"></div>' +
                                         '</div>' +
                                         '</header>', {
                                             headerClassName: headerClassName,
                                             timeTakenClassName: timeTakenClassName,
                                             progressBarClassName: progressBarClassName,
                                             headerOptionalClassName: headerOptionalClassName,
                                             statusTextClassName: statusTextClassName,
                                             packageVersion: packageVersion
                                         }));

        makeElementFixedOnScroll(header);
        container.appendChild(header);
    };

    // document title

    var originalTitle;

    var updateStatusInDocumentTitle = function (totalCount, doneCount) {
        if (originalTitle === undefined) {
            originalTitle = document.title;
        }

        document.title = "(" + doneCount + "/" + totalCount + ") " + originalTitle;
    };

    // header

    var padNumber = function (number, length) {
        number += '';
        while (number.length < length) {
            number = "0" + number;
        }
        return number;
    };

    var renderMilliseconds = function (time) {
        var seconds = Math.floor(time / 1000),
            milliSeconds = time % 1000;
        return seconds + '.' + padNumber(milliSeconds, 3);
    };

    var showTimeTaken = function (container, timeTakenInMillis) {
        var timeTaken = findElementIn(container, timeTakenClassName);
        timeTaken.textContent = "finished in " + renderMilliseconds(timeTakenInMillis) + "s";
    };

    var setOutcomeOnHeader = function (container, successful) {
        var header = findElementIn(container, headerClassName);

        header.classList.add(successful ? 'pass' : 'fail');
    };

    // progress bar

    var progressBarPendingClassName = 'pending';

    var testDescription = function (testCase) {
        var component;
        if (testCase.desc) {
            component = testCase.component ? testCase.component + ' ' : '';
            return component + testCase.desc;
        } else {
            return comparisonKey(testCase);
        }
    };

    var addTickToProgressBar = function (container, testCase, linkTarget) {
        var progressBar = findElementIn(container, progressBarClassName),
            clickableTickTemplate = '<li><a href="#{{linkTarget}}" title="{{title}}"></a></li>',
            deactivatedTickTemplate = '<li><a title="{{title}}"></a></li>',
            tickTemplate = linkTarget ? clickableTickTemplate : deactivatedTickTemplate;

        var tick = elementFor(template(tickTemplate, {
            linkTarget: linkTarget ? escapeId(linkTarget) : '',
            title: testDescription(testCase)
        }));
        tick.classList.add(progressBarPendingClassName);
        progressBar.appendChild(tick);

        if (pageNavigationHandlingFallback) {
            pageNavigationHandlingFallback.install(tick.querySelector('a'));
        }

        return tick;
    };

    var markTickDone = function (status, renderErrorCount, tickElement) {
        tickElement.classList.remove(progressBarPendingClassName);
        tickElement.classList.add(status);
        if (renderErrorCount > 0) {
            tickElement.classList.add('hasRenderErrors');
        }
    };

    // status bar

    var singularPlural = function (value, singularForm, pluralForm) {
        if (value === 1) {
            return singularForm;
        } else {
            return pluralForm;
        }
    };

    var statusTotalText = function (totalCount, selectedCount) {
        var totalContent = '{{total}} ' + singularPlural(totalCount, 'entry', 'entries') + ', ';
        if (selectedCount < totalCount) {
            totalContent = '{{selected}} of ' + totalContent;
        }
        return template('<span>' +
                        totalContent +
                        '</span>', {
            total: totalCount,
            selected: selectedCount
        });
    };

    var statusIssueText = function (issueCount, selectedCount, doneCount) {
        var issueContent = '{{issues}} ' + singularPlural(issueCount, 'needs', 'need') + ' some love',
            doneContent = 'all good',
            noTestsContent = "nothing here yet",
            doneWithoutErrors = selectedCount === doneCount && issueCount === 0,
            content;
        if (selectedCount === 0) {
            content = noTestsContent;
        } else if (doneWithoutErrors) {
            content = doneContent;
        } else {
            content = issueContent;
        }
        return template('<span>' +
                        content +
                        '</span>', {
                            issues: issueCount
                        });
    };

    var acceptAllClassName = 'acceptAll';

    var acceptAllButton = function () {
        return elementFor(template('<button class="{{acceptAllClassName}}">... accept all (I know what I\'m doing)</button>', {
            acceptAllClassName: acceptAllClassName
        }));
    };

    var showAcceptAllButtonIfNeccessary = function (container, acceptableEntries) {
        var statusText = findElementIn(container, statusTextClassName),
            button = statusText.querySelector('.' + acceptAllClassName);

        if (acceptableEntries.length > 2) {
            button.classList.add('active');
            button.onclick = function () {
                acceptableEntries.forEach(function (acceptableEntry) {
                    acceptableEntry.acceptPage();
                    acceptComparison(acceptableEntry.entry);
                });

                button.setAttribute('disabled', 'disabled');
            };
        }
    };

    var installFallbackClearSelectionHandler = function (element) {
        if (selectionFilter.clearFilter) {
            element.onclick = function (e) {
                selectionFilter.clearFilter();
                e.preventDefault();
            };
        }
    };

    var updateStatusBar = function (container, totalCount, selectedCount, issueCount, doneCount) {
        var runAllUrl = selectionFilter.clearFilterUrl ? selectionFilter.clearFilterUrl() : '#',
            runAll = elementFor(template('<a class="runAll" href="{{url}}">Run all</a>', {
                url: runAllUrl
            })),
            statusText = findElementIn(container, statusTextClassName);

        statusText.innerHTML = '';
        statusText.appendChild(elementFor(statusTotalText(totalCount, selectedCount)));
        statusText.appendChild(elementFor(statusIssueText(issueCount, selectedCount, doneCount)));
        statusText.appendChild(acceptAllButton());
        if (totalCount > selectedCount) {
            installFallbackClearSelectionHandler(runAll);
            statusText.appendChild(runAll);
        }
    };

    // ToC

    var getOrCreateToc = function (container) {
        var tocClassName = 'tocParent',
            toc = container.querySelector('.' + tocClassName);

        if (!toc) {
            toc = elementFor(template('<div class="{{className}}"><ul class="toc"></ul></div>', {
                className: tocClassName
            }));
            container.querySelector('.' + headerOptionalClassName).appendChild(toc);
        }
        return toc.querySelector('ul');
    };

    var addTocEntry = function (container, componentLabel, linkTarget) {
        var toc = getOrCreateToc(container),
            entry = elementFor(template('<li class="tocEntry">' +
                                        '<a href="#{{linkTarget}}">{{headline}}</a>' +
                                        '</li>', {
                                            linkTarget: escapeId(linkTarget),
                                            headline: componentLabel
                                        }));

        if (pageNavigationHandlingFallback) {
            pageNavigationHandlingFallback.install(entry.querySelector('a'));
        }

        toc.appendChild(entry);
    };

    // component headline

    var installFallbackComponentSelectionHandler = function (element, componentLabel) {
        if (selectionFilter.filterForComponent) {
            element.onclick = function (e) {
                selectionFilter.filterForComponent(componentLabel);
                e.preventDefault();
            };
        }
    };

    var addComponentHeading = function (container, componentLabel) {
        var filterUrl = selectionFilter.filterUrlForComponent ? selectionFilter.filterUrlForComponent(componentLabel) : '#',
            headlineElement = elementFor(template('<h2 class="componentLabel"><a href="{{filterUrl}}">{{headline}}</a></h2>', {
                headline: componentLabel,
                filterUrl: filterUrl
            }));

        installFallbackComponentSelectionHandler(headlineElement, componentLabel);
        container.appendChild(headlineElement);
    };

    // comparisons

    var comparisonKey = function (testCase) {
        var testCaseParameters = util.excludeKeys(testCase, 'url'),
            serializedParameters = util.serializeMap(testCaseParameters),
            key = testCase.url;

        if (serializedParameters) {
            return key + ',' + serializedParameters;
        }

        return key;
    };

    var runningComparisonClassName = 'running',
        referenceImageContainerClassName = 'referenceImageContainer',
        errorContainerClassName = 'errorText';

    var imageWrapper = function (image) {
        var wrapper = elementFor('<div class="imageWrapper"></div>');
        wrapper.appendChild(image);
        return wrapper;
    };

    var serializeValue = function (value) {
        if (typeof value === 'string') {
            return "'" + value + "'";
        }
        return value;
    };

    var testCaseParameters = function (testCase) {
        var parameters = util.excludeKeys(testCase, 'url', 'desc', 'component'),
            keys = Object.keys(parameters);

        if (!keys.length) {
            return '';
        }
        keys.sort();

        return '<dl class="parameters">' +
            keys.map(function (key) {
                return template('<dt>{{key}}</dt><dd>{{value}}</dd>', {
                    key: key,
                    value: serializeValue(parameters[key])
                });
            }).join('\n') +
            '</dl>';
    };

    var installFallbackSelectionHandler = function (element, testCase) {
        if (selectionFilter.filterFor) {
            element.onclick = function (e) {
                selectionFilter.filterFor(testCase);
                e.preventDefault();
            };
        }
    };

    var addComparison = function (container, testCase, referenceImage, key) {
        var titleLinkClassName = 'titleLink',
            filterUrl = selectionFilter.filterUrlFor ? selectionFilter.filterUrlFor(testCase) : '#',
            comparison = elementFor(template('<section class="comparison {{runningComparisonClassName}}">' +
                                             '<h3 class="title">' +
                                             '<a class="{{titleLinkClassName}}" href="{{filterUrl}}">{{title}}</a> ' +
                                             '<a class="externalLink" href="{{url}}"></a>' +
                                             testCaseParameters(testCase) +
                                             '</h3>' +
                                             '<div class="{{errorContainerClassName}}"></div>' +
                                             '<div>' +
                                             '<div class="{{referenceImageContainerClassName}}"></div>' +
                                             '</div>' +
                                             '</section>', {
                                                 url: testCase.url,
                                                 title: testCase.desc ? testCase.desc : testCase.url,
                                                 filterUrl: filterUrl,
                                                 runningComparisonClassName: runningComparisonClassName,
                                                 errorContainerClassName: errorContainerClassName,
                                                 referenceImageContainerClassName: referenceImageContainerClassName,
                                                 titleLinkClassName: titleLinkClassName
                                             })),
            anchorTarget = elementFor(template('<span class="fixedHeaderAnchorTarget" id="{{id}}"></span>', {
                id: escapeId(key)
            })),
            referenceImageContainer = comparison.querySelector('.' + referenceImageContainerClassName),
            titleLink = comparison.querySelector('.' + titleLinkClassName);

        if (referenceImage) {
            referenceImageContainer.appendChild(imageWrapper(referenceImage));
        }
        installFallbackSelectionHandler(titleLink, testCase);

        container.appendChild(anchorTarget);
        container.appendChild(comparison);

        return comparison;
    };

    var canvasForImageCanvas = function (imageData) {
        var canvas = document.createElement("canvas"),
            context;

        canvas.height = imageData.height;
        canvas.width  = imageData.width;

        context = canvas.getContext("2d");
        context.putImageData(imageData, 0, 0);

        return canvas;
    };

    var diffPageImages = function (imageA, imageB) {
        return imagediff.diff(imageA, imageB, {align: 'top'});
    };

    var embossChanges = function (imageData) {
        var d = imageData.data,
            i;
        for (i = 0; i < d.length; i += 4) {
            if (d[i] === 0 && d[i+1] === 0 && d[i+2] === 0) {
                d[i+3] = 0;
            } else {
                d[i] = 0;
                d[i+1] = 0;
                d[i+2] = 255;
                d[i+3] = 255;
            }
        }
        return imageData;
    };

    var getDifferenceCanvas = function (imageA, imageB) {
        var differenceImageData = diffPageImages(imageA, imageB),
            canvas = canvasForImageCanvas(embossChanges(differenceImageData));

        canvas.classList.add('diff');
        return canvas;
    };

    // Use a canvas for display to work around https://bugzilla.mozilla.org/show_bug.cgi?id=986403
    var canvasForImage = function (image) {
        var canvas = document.createElement("canvas"),
            width  = image.naturalWidth,
            height = image.naturalHeight,
            context;

        canvas.width  = width;
        canvas.height = height;

        context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);

        // fix size in css so the tests will show something (canvas is not supported so far)
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        return canvas;
    };

    var addImageDiff = function (image, imageForDiff, container) {
        var referenceImageContainer = container.querySelector('.' + referenceImageContainerClassName);

        referenceImageContainer.appendChild(getDifferenceCanvas(image, imageForDiff));
    };

    var toggleViewClassName = 'toggleView',
        acceptClassName = 'accept';

    var acceptComparison = function (container) {
        var acceptButton = container.querySelector('.' + acceptClassName);
        acceptButton.setAttribute('disabled', 'disabled');
        acceptButton.textContent = "✓";
        container.classList.add('accepted');
    };

    var acceptButton = function (acceptPage, container) {
        var button = elementFor(template('<button class="{{acceptClassName}}">' +
                                         '<span>Accept</span>' +
                                         '</button>', {
                                             acceptClassName: acceptClassName
                                         }));
        button.onclick = function () {
            acceptPage();
            acceptComparison(container);
        };
        return button;
    };

    var showPageImage = function (pageImage, testCaseUrl, realView, imageContainer, container) {
        imageContainer.innerHTML = '';
        if (realView) {
            imageContainer.appendChild(imageWrapper(pageAsIframe(pageImage, testCaseUrl)));

            container.classList.add('realView');
        } else {
            imageContainer.appendChild(imageWrapper(pageImage));

            container.classList.remove('realView');
        }
    };

    var pageImageContainer = function (pageImage, acceptPage, testCaseUrl, container) {
        var pageImageContainerClassName = 'pageImageContainer',
            outerPageImageContainer = elementFor(template('<div class="outerPageImageContainer">' +
                                                          '<div class="{{pageImageContainerClassName}}"></div>' +
                                                          '<button class="{{toggleViewClassName}}" title="Toggle DOM view"></button>' +
                                                          '</div>', {
                                                              pageImageContainerClassName: pageImageContainerClassName,
                                                              toggleViewClassName: toggleViewClassName
                                                          })),
            pageImageContainer = outerPageImageContainer.querySelector('.' + pageImageContainerClassName),
            toggleButton = outerPageImageContainer.querySelector('.' + toggleViewClassName),
            showRealView = false,
            accepted = false,
            acceptButtonElement;

        if (acceptPage) {
            acceptButtonElement = acceptButton(function () {
                accepted = true;
                acceptPage();
            }, container);

            outerPageImageContainer.appendChild(acceptButtonElement);
        }

        showPageImage(pageImage, testCaseUrl, showRealView, pageImageContainer, container);

        toggleButton.onclick = function () {
            showRealView = !showRealView;
            showPageImage(pageImage, testCaseUrl, showRealView, pageImageContainer, container);

            if (acceptPage) {
                if (showRealView) {
                    acceptButtonElement.setAttribute('disabled', 'disabled');
                } else if (!accepted) {
                    acceptButtonElement.removeAttribute('disabled');
                }
            }
        };

        return outerPageImageContainer;
    };

    var showComparisonWithDiff = function (pageImage, referenceImage, acceptPage, testCaseUrl, container) {
        addImageDiff(referenceImage, pageImage, container);
        container.appendChild(pageImageContainer(canvasForImage(pageImage), acceptPage, testCaseUrl, container));
    };

    var pageAsIframe = function (pageImage, testCaseUrl) {
        var iframe = document.createElement('iframe');
        iframe.width = pageImage.width;
        iframe.height = pageImage.height;
        iframe.src = testCaseUrl;
        iframe.scrolling = "no";
        return iframe;
    };

    var showComparisonWithoutReference = function (pageImage, acceptPage, testCaseUrl, container) {
        container.appendChild(pageImageContainer(canvasForImage(pageImage), acceptPage, testCaseUrl, container));
    };

    var sameOriginWarning = 'Make sure the path lies within the ' +
        '<a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">' +
        'same origin' +
        '</a> ' +
        'as this document.';

    var showComparisonWithError = function (url, container) {
        var errorMsg = elementFor(template('<span>' +
                                           'The page "{{url}}" could not be rendered. ' +
                                           sameOriginWarning +
                                           '</span>', {
                                               url: url
                                           })),
            errorContainer = container.querySelector('.' + errorContainerClassName);
        errorContainer.appendChild(errorMsg);
    };

    var showRenderErrors = function (errors, container) {
        var errorMsg = elementFor(template('<span>' +
                                           'Had the following errors rendering the page:' +
                                           '<ul></ul>' +
                                           sameOriginWarning +
                                           '</span>')),
            listElement = errorMsg.querySelector('ul'),
            errorContainer = container.querySelector('.' + errorContainerClassName);

        errors.map(function (error) {
            return elementFor(template('<li>{{msg}}</li>', {msg: error}));
        }).forEach(function (li) {
            listElement.appendChild(li);
        });

        errorContainer.appendChild(errorMsg);
    };

    var updateComparisonStatus = function (status, container) {
        container.classList.remove(runningComparisonClassName);
        container.classList.add(status);
    };

    // browser warning

    var supportsReadingHtmlFromCanvas = function () {
        return rasterizeHTML.drawHTML('<b></b>').then(function (result) {
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");
            try {
                context.drawImage(result.image, 0, 0);
                // This will fail in Chrome & Safari
                canvas.toDataURL("image/png");
                return true;
            } catch (e) {
                return false;
            }
        });
    };

    var browserIssueChecked = false;

    var showBrowserWarningIfNeeded = function (container) {
        if (browserIssueChecked) {
            return;
        }
        browserIssueChecked = true;

        supportsReadingHtmlFromCanvas().then(function (supported) {
            if (supported) {
                return;
            }

            container.appendChild(elementFor(
                '<div class="browserWarning">' +
                    'Your browser is currently not supported, ' +
                    'as it does not support reading rendered HTML from the canvas ' +
                    '(<a href="https://code.google.com/p/chromium/issues/detail?id=294129">Chrome #294129</a>, ' +
                    '<a href="https://bugs.webkit.org/show_bug.cgi?id=17352">Safari #17352</a>). How about trying Firefox?' +
                    '</div>'
            ));
        });
    };

    // the reporter

    module.NiceReporter = function (outerContainer) {
        var totalCount = 0,
            selectedCount = 0,
            doneCount = 0,
            issueCount = 0,
            progressTickElements = {},
            runningComparisonEntries = {},
            acceptableComparisons = [],
            containerElement, timeStarted, lastComponentLabel;

        var container = function () {
            if (!containerElement) {
                containerElement = createContainer(outerContainer || document.body);
            }
            return containerElement;
        };

        var registerComparison = function () {
            totalCount += 1;
            if (!timeStarted) {
                timeStarted = Date.now();
            }

            showBrowserWarningIfNeeded(container());
            updateStatusInDocumentTitle(totalCount, doneCount);
            updateStatusBar(container(), totalCount, selectedCount, issueCount);
        };

        return {
            reportDeselectedComparison: function (comparison) {
                registerComparison();

                addTickToProgressBar(container(), comparison.testCase);
            },
            reportSelectedComparison: function (comparison) {
                var key = comparisonKey(comparison.testCase);
                selectedCount += 1;

                if (comparison.testCase.component && comparison.testCase.component !== lastComponentLabel) {
                    lastComponentLabel = comparison.testCase.component;
                    addComponentHeading(container(), comparison.testCase.component);
                    addTocEntry(container(), comparison.testCase.component, key);
                }

                registerComparison();

                var tickElement = addTickToProgressBar(container(), comparison.testCase, key);
                progressTickElements[key] = tickElement;

                var comparisonElement = addComparison(container(),
                                                      comparison.testCase,
                                                      comparison.referenceImage,
                                                      key);
                runningComparisonEntries[key] = comparisonElement;
            },
            reportComparison: function (comparison) {
                var key = comparisonKey(comparison.testCase),
                    tickElement = progressTickElements[key],
                    entry = runningComparisonEntries[key];

                doneCount += 1;
                if (comparison.status !== 'passed') {
                    issueCount += 1;
                }

                updateStatusInDocumentTitle(totalCount, doneCount);
                updateStatusBar(container(), totalCount, selectedCount, issueCount, doneCount);
                markTickDone(comparison.status, comparison.renderErrors.length, tickElement);

                if (comparison.status === 'failed') {
                    showComparisonWithDiff(comparison.pageImage,
                                           comparison.referenceImage,
                                           comparison.acceptPage,
                                           comparison.testCase.url,
                                           entry);
                    acceptableComparisons.push(comparison);
                } else if (comparison.status === 'referenceMissing') {
                    showComparisonWithoutReference(comparison.pageImage,
                                                   comparison.acceptPage,
                                                   comparison.testCase.url,
                                                   entry);
                    acceptableComparisons.push(comparison);
                } else if (comparison.status === 'passed') {
                    showComparisonWithoutReference(comparison.pageImage,
                                                   undefined,
                                                   comparison.testCase.url,
                                                   entry);
                } else if (comparison.status === 'error') {
                    showComparisonWithError(comparison.testCase.url,
                                            entry);
                }

                if (comparison.renderErrors.length > 0) {
                    showRenderErrors(comparison.renderErrors, entry);
                }

                updateComparisonStatus(comparison.status, entry);
            },
            reportTestSuite: function (result) {
                var acceptableEntries = acceptableComparisons.map(function (comparison) {
                    var key = comparisonKey(comparison.testCase);
                    return {
                        acceptPage: comparison.acceptPage,
                        entry: runningComparisonEntries[key]
                    };
                });

                updateStatusInDocumentTitle(totalCount, doneCount);
                updateStatusBar(container(), totalCount, selectedCount, issueCount, doneCount);

                showTimeTaken(container(), timeStarted ? Date.now() - timeStarted : 0);
                setOutcomeOnHeader(container(), result.success);
                showAcceptAllButtonIfNeccessary(container(), acceptableEntries);
            }
        };
    };

    return module;
};
