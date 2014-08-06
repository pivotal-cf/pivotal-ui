// Anything in here is definitely a code smell. We should refactor all of the initializers
// to happen via data-behavior attributes rather than inline JS.

var styleGuide = angular.module('styleGuide', ['ConsoleApp']);

// These Angular controllers are lost and need a better home
styleGuide.controller('FormContentEditableController',['$scope', '$timeout','$q','EditableText', function(scope, timeout, q, editableText) {
  var newModelConstructor = function() {
    return { name: 'Editable Text'};
  }

  var getForm = function () {
    return scope.newEditableForm;
  };

  var persist = function(_) {
    return scope.validate();
  }
  scope.editText = editableText(newModelConstructor, getForm, persist)

  scope.validate = function(){
    var deferred = q.defer();
    timeout(function() {
      if (scope.editText.newModel.name == "500") {
        deferred.reject({data: {errors: ['Something has gone awry. It\'s probably Scott\'s fault']}});
      } else {
        deferred.resolve();
      }
    }, 2000);
    return deferred.promise;
  };
}]);

angular.module('ConsoleApp').directive('invalidInvalid', [function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue == 'invalid') {
          ctrl.$setValidity('invalidInvalid', false);
          return undefined;
        } else {
          ctrl.$setValidity('invalidInvalid', true);
          return viewValue;
        }
      });
    }
  }
}]);

styleGuide.controller("StyleguideToggleCtrl", [ '$scope', function (scope) {
  scope.subject = {
    secondaryState: false
  };

  scope.toggleState = function() {
    scope.subject.secondaryState = !scope.subject.secondaryState;
  };
}]);

styleGuide.controller('ExampleSpaceDataTableCtrl',['$scope','Sorter', function($scope, sorter) {
  $scope.tableItems = [
    {name: 'HR-Org',totalApps:3,runningApps:5,stoppedApps:5, downApps:6,serviceInstances:34,quota:57},
    {name: 'Test-Org',totalApps:10,runningApps:0,stoppedApps:3, downApps:56,serviceInstances:5,quota:79},
    {name: 'Dev-Org',totalApps:4,runningApps:10,stoppedApps:45, downApps:9,serviceInstances:9,quota:34},
   ]
  $scope.sorter = sorter($scope.tableItems, 'name', 'asc');
}]);


styleGuide.controller("StyleguideAddableTableCtrl", [ '$scope', '$timeout','$q', 'AddableTable', function (scope, timeout, q, addableTable) {
  var collection = {
    items:[
      {name: 'HR-Space', totalApps:3, runningApps:5, stoppedApps:5, downApps:6, serviceInstances:34, quota:57},
      {name: 'Test-Space', totalApps:10, runningApps:0, stoppedApps:3, downApps:56, serviceInstances:5, quota:79},
      {name: 'Dev-Space', totalApps:4, runningApps:10, stoppedApps:45, downApps:9, serviceInstances:9, quota:34}
    ],
    newModelConstructor: function() {
      return { name: null, totalApps:'-',runningApps:'-',stoppedApps:'-', downApps:'-',serviceInstances:'-',quota:'-', saveRequested: true, saved: false};
    },
    persist: function(model) {
      var deferred = q.defer();
      timeout(function() {
        if (model.name == "500") {
          deferred.reject({data: {errors: ['Something has gone awry. It\'s probably Scott\'s fault']}});
        } else {
          deferred.resolve();
        }
      }, 2000);
      return deferred.promise;
    },
    destroy: function() {
      var deferred = q.defer();
      timeout(function() {deferred.resolve();}, 1000);
      return deferred.promise;
    }
  },
  getAddForm = function() {
    return scope.newSpaceForm;
  };

  scope.spaceTable = addableTable(getAddForm, collection)

}]);

styleGuide.controller("StyleguideKitchenSinkTableCtrl", [ '$scope', '$timeout','$q', 'AddableTable', 'Sorter', function (scope, timeout, q, addableTable, Sorter) {
  var collection = {
    items:[
      {name: 'HR-Space', totalApps:3, runningApps:5, stoppedApps:5, downApps:6, serviceInstances:34, quota:57},
      {name: 'Test-Space', totalApps:10, runningApps:0, stoppedApps:3, downApps:56, serviceInstances:5, quota:79},
      {name: 'Dev-Space', totalApps:4, runningApps:10, stoppedApps:45, downApps:9, serviceInstances:9, quota:34}
    ],
    newModelConstructor: function() {
      return { name: null, totalApps:'-',runningApps:'-',stoppedApps:'-', downApps:'-',serviceInstances:'-',quota:'-', saveRequested: true, saved: false};
    },
    persist: function(model) {
      var deferred = q.defer();
      timeout(function() {
        if (model.name == "500") {
          deferred.reject({data: {errors: ['Something has gone awry. It\'s probably Scott\'s fault']}});
        } else {
          deferred.resolve();
        }
      }, 2000);
      return deferred.promise;
    }
  },
  getAddForm = function() {
    return scope.newSpaceForm;
  };

  scope.sorter = Sorter(collection.items, 'name', 'asc');
  var sortableCollection = _.extend(_.clone(collection), {
    persist: function() {
      scope.sorter.clearSort();
      return collection.persist.apply(collection, arguments);
    }
  });
  scope.spaceTable = addableTable(getAddForm, sortableCollection);
}]);

styleGuide.controller('InlineModalExampleCtrl',['$scope', function(scope) {
  scope.inlineModalExample = {state: 'showing'};

  scope.activateInlineModal = function() {
     scope.inlineModalExample.state = 'editing';
  };
  scope.deactivateInlineModal = function() {
     scope.inlineModalExample.state = 'showing';
  };
}]);

styleGuide.controller('FancyNumberExampleCtrl',['$scope', function(scope) {
  scope.exampleModel = {instances: 2};
}]);

// Attach listener for list demo
$(document).ready(function() {
  $('[data-add-item-to]').on('click', function(e) {
    var target = $(e.currentTarget).data('add-item-to');
    $(target).prepend('<li class="list-group-item new">New Item</li>');
  });
});

// Initialize application health indicator
$(document).ready(
    function(){
        var $container = $(".health");
        new ApplicationStartStopButton($container);
        $container.on("js:changed", function() { new ApplicationStartStopButton($container); });
    }
);

// HAML/HTML Toggle
$(document).ready(
  function(){
    $('.codeExample.html').hide();
    $('[data-haml-toggle]').click(function() {
      var languageToShow = $(this).data('haml-toggle'),
        languageToHide = {haml: 'html', html: 'haml'}[languageToShow];
      $('.codeExample.' + languageToShow).show();
      $('.codeExample.' + languageToHide).hide();
    });
  }
);

// Toggle code view in the style guide

$(document).ready(
  function(){
    //this is hacky, but not much value in making it better.
    $('#styleguide-toggle-code-haml').change(
      function(e) {
        e.preventDefault();
        // determine position on page
        var $active_section = $('li.active li.active a').length > 0 ? $('li.active li.active a') : $('li.active a');
        // show/hide code
        $('html').toggleClass('code-hide-haml');
        $('[data-spy="scroll"]').each(function () {
          $(this).scrollspy('refresh');
        });
        // Scroll to previous position on page
        $("html, body").animate({ scrollTop: $($active_section.attr('href')).offset().top}, 0)
      }
    )
    $('#styleguide-toggle-code-html').change(
      function(e) {
        e.preventDefault();
        // determine position on page
        var $active_section = $('li.active li.active a').length > 0 ? $('li.active li.active a') : $('li.active a');
        // show/hide code
        $('html').toggleClass('code-hide-html');
        $('[data-spy="scroll"]').each(function () {
          $(this).scrollspy('refresh');
        });
        // Scroll to previous position on page
        $("html, body").animate({ scrollTop: $($active_section.attr('href')).offset().top}, 0)
      }
    )
    //hack alert: start with html off.
    $('html').addClass('code-hide-html');
  }
);

//prevent angular from binding to code examples.
$('pre').attr('ng-non-bindable', true);
