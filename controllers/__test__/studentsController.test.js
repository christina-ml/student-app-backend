const app = require('../../app.js');
const supertest = require('supertest');

describe('returns json data for all students', () => {
    it ('returns an object will all students', async () => {

        await supertest(app).get("/students")
            .expect(200)
            .then((response) => {
                // expect(response.body.students[0].firstName).toBe("Ingaberg");
                expect(response.body.students).toBeInstanceOf(Array);
                expect(response.body.students.length).toBe(25);
            })
    })

    it('returns an object with a number of students equal to or less than a limit', async() => {

        await supertest(app).get("/students?limit=10")
            .expect(200)
            .then((response) => {
                expect(response.body.students).toBeInstanceOf(Array);
                expect(response.body.students.length).toBe(10);
            })

        await supertest(app).get("/students?limit=35")
            .expect(200)
            .then((response) => {
                expect(response.body.students).toBeInstanceOf(Array);
                expect(response.body.students.length).toBe(25);
            })

    })
})


// Lab:
// modify this api so that it takes a min and max id and returns all students by id in that range

// output:
//  /students?min=3&max=10

// returns:
// all students with ids >= 3 and <= 10



// you need to install jest: 
// npm install -D jest
// npm install -D supertest

// npm run test


// 6/22/22 (Wednesday)
// Takeaways from today's class:
// take what we learned today with supertests, 
// make sure that your one project is set up with tracking on codetrack
// filter by commits this week
// added supertest to such-and-such route (should be your commit)
// ^ something you can use in an interview

// query strings today
// do I have any routes that can use a query string?
// if I have a shopping cart, can I set a min price or max price?
// added query string for such-and-such route (should be your commit)

// last commit -> added jest test and supertest

// there's a huge majority of us with no commits.