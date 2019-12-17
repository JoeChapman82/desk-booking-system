require('dotenv').config();

before((done) => {
    console.log(`Running tests: Environment = ${process.env.NODE_ENV}`);
    done();
});

after((done) => {
    console.log('Tests complete');
    done();
});
