GET api/user  http://localhost:1428/api/user - get all users
GET api/user/:id  http://localhost:1428/api/user/2 - get one particular user with id = 2
POST api/user/ http://localhost:1428/api/user/   - create new user with data provided in body
PUT  api/user/:id  http://localhost:1428/api/user/2 - update one particular user with id = 2, new data are in request body

GET api/message  http://localhost:1428/api/message/  - get all messages
GET api/message/:id  http://localhost:1428/api/message/2 - get one particular message with id = 2
POST api/message/ http://localhost:1428/api/message/  - create new message with data provided in body
PUT  api/message/:id http://localhost:1428/api/message/2 - update one particular message with id = 2, new data are in request body
GET api/message/query/:id http://localhost:1428/api/message/query/2 - find all messages where either sender user id == 2 or receiver user id ==2
