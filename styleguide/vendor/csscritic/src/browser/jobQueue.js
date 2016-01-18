csscriticLib.jobQueue = function () {
    "use strict";

    var module = {};

    var jobQueue = [],
        busy = false;

    var runJob = function (job) {
        var result = job.func();

        job.resolve(result);
        return result;
    };

    var nextInQueue = function () {
        var job;
        if (jobQueue.length > 0) {
            busy = true;

            job = jobQueue.shift();

            runJob(job)
                .then(nextInQueue, nextInQueue);
        } else {
            busy = false;
        }
    };

    var constructJob = function (func) {
        var defer = ayepromise.defer();

        return {
            func: func,
            resolve: defer.resolve,
            promise: defer.promise
        };
    };

    module.execute = function (func) {
        var job = constructJob(func);

        jobQueue.push(job);
        if (!busy) {
            nextInQueue();
        }

        return job.promise;
    };

    return module;
};
