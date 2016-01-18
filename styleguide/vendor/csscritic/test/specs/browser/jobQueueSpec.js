describe("Job Queue", function () {
    "use strict";

    var subject;

    beforeEach(function () {
        subject = csscriticLib.jobQueue();
    });

    it("should execute a single job", function () {
        var defer = ayepromise.defer(),
            job = jasmine.createSpy("job").and.returnValue(defer.promise);
        subject.execute(job);

        expect(job).toHaveBeenCalled();
    });

    it("should execute two jobs sequencially", function (done) {
        var defer1 = ayepromise.defer(),
            job1 = jasmine.createSpy("job1").and.returnValue(defer1.promise),
            defer2 = ayepromise.defer(),
            job2 = jasmine.createSpy("job2").and.returnValue(defer2.promise);

        subject.execute(job1);
        subject.execute(job2);

        expect(job1).toHaveBeenCalled();
        expect(job2).not.toHaveBeenCalled();

        defer1.resolve();

        defer1.promise.then(function () {
            expect(job2).toHaveBeenCalled();

            done();
        });
    });

    it("should execute following job even if it fails", function (done) {
        var defer1 = ayepromise.defer(),
            job1 = jasmine.createSpy("job1").and.returnValue(defer1.promise),
            defer2 = ayepromise.defer(),
            job2 = jasmine.createSpy("job2").and.returnValue(defer2.promise);

        subject.execute(job1);
        subject.execute(job2);

        expect(job1).toHaveBeenCalled();
        expect(job2).not.toHaveBeenCalled();

        defer1.reject();

        defer1.promise.then(null, function () {
            expect(job2).toHaveBeenCalled();

            done();
        });
    });

    it("should return a promise for the job to be executed", function (done) {
        var defer = ayepromise.defer(),
            job = jasmine.createSpy("job").and.returnValue(defer.promise),
            jobExecutionSpy = jasmine.createSpy('jobExecution');

        var executionPromise = subject.execute(job);
        executionPromise.then(jobExecutionSpy);

        defer.resolve('the_result');

        defer.promise.then(function () {
            setTimeout(function () {
                expect(jobExecutionSpy).toHaveBeenCalledWith('the_result');

                done();
            }, 10);
        });
    });

    it("should handle rejection for the returned promise of the executed job", function (done) {
        var defer = ayepromise.defer(),
            job = jasmine.createSpy("job").and.returnValue(defer.promise),
            jobExecutionSpy = jasmine.createSpy('jobExecution'),
            e = new Error();

        var executionPromise = subject.execute(job);
        executionPromise.then(null, jobExecutionSpy);

        defer.reject(e);

        defer.promise.then(null, function () {
            setTimeout(function () {
                expect(jobExecutionSpy).toHaveBeenCalledWith(e);

                done();
            }, 10);
        });
    });
});
