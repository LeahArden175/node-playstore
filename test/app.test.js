const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('Get /apps endpoint', () => {
    
    it('should return an array of apps', () => {
        return supertest(app)
          .get('/apps')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            expect(res.body[0]).to.be.an('object')
            expect(res.body[0]).to.include.all.keys('Rating', 'Genres', 'App')
          })
      });

      it('Should return 400 if param is not "Rating" or "App"', () => {
          return supertest(app)
            .get('/apps')
            .query({ sort : 'INCORRECT'})
            .expect(400, 'Apps can only only be sorted by Rating or App');
      });

      it('Should return 400 if genre param is not "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"', () => {
        return supertest(app)
        .get('/apps')
        .query({ genres : 'INCORRECT'})
        .expect(400, 'App genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, or Card.');
      })


      it('should sort by "Rating or "App', () => {
          const validSorts = ['Rating', 'App'];
          validSorts.forEach(sort => {
              it(`should return ${sort}-sorted array of apps`, () =>{
                return supertest(app)
                .get('/apps')
                .query({ sort: 'Rating' })
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                  expect(res.body).to.be.an('array');
                  let i = 0;
                  let sorted = true;
                  while(sorted && i < res.body.length - 1) {
                    sorted = res.body[i][sort] >= res.body[i+1][sort];
                    i++;
                  }
                  expect(sorted).to.be.true;
                });
              })
          })
      });

    it('Should filter by genre', () => {
        const expectedOutput = [
            { 
                'App': 'Candy Crush Saga',
                'Category': 'GAME',
                'Rating': 4.4,
                'Reviews': '22426677',
                'Size': '74M',
                'Installs': '500,000,000+',
                'Type': 'Free',
                'Price': '0',
                'Content Rating': 'Everyone',
                'Genres': 'Casual',
                'Last Updated': 'July 5, 2018',
                'Current Ver': '1.129.0.2',
                'Android Ver': '4.1 and up'
              },
              {
                'App': 'Bubble Shooter',
                'Category': 'GAME',
                'Rating': 4.5,
                'Reviews': '148897',
                'Size': '46M',
                'Installs': '10,000,000+',
                'Type': 'Free',
                'Price': '0',
                'Content Rating': 'Everyone',
                'Genres': 'Casual',
                'Last Updated': 'July 17, 2018',
                'Current Ver': '1.20.1',
                'Android Ver': '4.0.3 and up'
              },
              {
                'App': 'Hello Kitty Nail Salon',
                'Category': 'GAME',
                'Rating': 4.2,
                'Reviews': '369203',
                'Size': '24M',
                'Installs': '50,000,000+',
                'Type': 'Free',
                'Price': '0',
                'Content Rating': 'Everyone',
                'Genres': 'Casual;Pretend Play',
                'Last Updated': 'April 17, 2018',
                'Current Ver': '1.5',
                'Android Ver': '4.1 and up'
              },
              {
                'App': 'Pou',
                'Category': 'GAME',
                'Rating': 4.3,
                'Reviews': '10485308',
                'Size': '24M',
                'Installs': '500,000,000+',
                'Type': 'Free',
                'Price': '0',
                'Content Rating': 'Everyone',
                'Genres': 'Casual',
                'Last Updated': 'May 25, 2018',
                'Current Ver': '1.4.77',
                'Android Ver': '4.0 and up'
              },
              {
                'App': 'Candy Crush Soda Saga',
                'Category': 'GAME',
                'Rating': 4.4,
                'Reviews': '6198563',
                'Size': '67M',
                'Installs': '100,000,000+',
                'Type': 'Free',
                'Price': '0',
                'Content Rating': 'Everyone',
                'Genres': 'Casual',
                'Last Updated': 'July 10, 2018',
                'Current Ver': '1.118.4',
                'Android Ver': '4.1 and up'
              },
        ]

        return supertest(app)
            .get('/apps')
            .query({ genres: 'Casual'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then( res => {
                expect(res.body).to.be.an('array');
                expect(res.body).eql(expectedOutput)
            })
    })
})