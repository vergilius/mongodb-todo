# mongodb-todo

An example todo app:
- Nodejs + Babel (esnext),
- MongoDB + mongoose to deal with connection and schema,
- jest for testing (not much unit tests out there),
- supertest to help with endpoint testing

Notes:
- **The app requires MongoDB server running (`mongod`)**
- There were different options to test the app (only unit / integration), I went for something in between (Jest <3 + little bit of Supertest)
- Implementation is not finished, I've spent most of the time on trying to figure out the point above
- Using flow type was a genuine idea, I'm unhappy with current type coverage

Run `yarn start` for app startup, see `package.json` for details.
