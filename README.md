## Evaluati.one

<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/5632544/27002864-1f3e18bc-4dec-11e7-9cd3-3d3124ee4866.png">
</p>

**Evaluati.one** is a platform for gathering feedback on employees to help companies to assess personnel competencies and proficiency with employees self-review processes that encourage their engagement in personal development.

This is developed during the [Web Application Engineering Master Course](https://wwwmatthes.in.tum.de/pages/1mqqqoqe7gapz/SEBA-Master-Web-Application-Engineering) at TUM that provides the necessary theoretical foundations to design and develop state-of-the art web applications. Next to the technical aspects to develop applications for the web, business aspects are covered with the most common business models and explained with real-world examples.

## Motivation

Learn how to design web sites from the scratch including patterns for recurring problems. Technical aspects for the development of web applications are presented along with generic platforms and architectures.

## Getting Started

The app itself consists of two independent parts: backend (API) server and frontend.

### Requirements

The app is based on MEAN stack and is tested on NodeJS 7 but should work on NodeJS 5+. It also uses Docker for deployement.

### Docker Development Environment
To setup developer environment you can use `./dev.sh` script that will setup containers needed including the mongodb instance seeded with test domain data. It mounts volumes binded to your local machine so that you can edit code locally and see all changes directly without reloading the container, **therefore `npm install` is required prior using the script.**

- `./dev.sh -h` for the help menu.
- `./dev.sh -a true|false ` to run dev docker-compose with jwt auth enabled.
- `./dev.sh -a true|false -d` to run docker-compose with development environment
- `./dev.sh -a true|false -p` to run docker-compose with prod environment (not ready)
- `./dev.sh -k` to kill docker-compose env. (if for whatever reason it's not killed already)

Use `employee:employee` and `manager:manager` users to play with a dashboard and features.

### Backend

You may also want to start backend directly via npm scripts:

```
# Install dependencies
npm install

# Run Mongodb
mongod --db-path <path-to-db-folder>

# Start development live-reload server
npm run dev

# Start development live-reload server with unprotected resources 
npm run dev dev-unprotected
(eq. npm run dev -- --auth_enabled=false)

# Start production server:
npm run deploy

# Start production server on HOST:PORT
npm run deploy -- --server_port=8000
```

Backend config loading priority:
1) Cli arguments (--param=val)
2) Environment variables
3) Default values defined in ./config.js

### Frontend

To run frontend with npm use these cmds:

```
# Install dependencies
npm install

# Build assest
npm run build 

# Watch the assets
npm run watch 

# Start server:
npm run start

# Start dev server:
npm run start-dev
```

## Backend REST API
| Request URL & Method                                   | Req Payload                                                                                                                           | Res Code | Response Body                                                           |
|--------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------|
| POST /api/register                                     | { "type": enum(MANAGER,EMPLOYEE), "name": string, "username": string!, "email": string!, "password": string, "position": string? }    | 200      | Registers new User                                                      |
| GET /api/login?username={:usrname}&password={:psw}     | { "username": string, "password": string}                                                                                             | 200/404  | JWT token                                                               |
| GET /api/customer?domain={:domain}                     | -/-                                                                                                                                   | 200      | List of Customer entities filtered by :domain (optional)                |
| POST /api/customers                                    | {"name": string, "domain": string}                                                                                                    | 200      | Created Customer entity                                                 |
| PUT /api/customers/{:id}                               | {"name": string, "domain": string}                                                                                                    | 200/404  | Updated Customer entity                                                 |
| GET /api/customers/{:id}                               | -/-                                                                                                                                   | 200/404  | Customer entity with id == :id                                          |
| DELETE /api/customers/{:id}                            | -/-                                                                                                                                   | 202/404  | -/-                                                                     |
| GET /api/customers/{:id}/subscriptions                 | -/-                                                                                                                                   | 200/404  | List of all Customer's subscriptions                                    |
| POST /api/customers/{:id}/subscriptions                | {"paymentMethod": string?, "planId": objectId}                                                                                        | 200/404  | Created Subscription entity                                             |
| DELETE /api/customers/{:id}/subscriptions/{:subscr_id} | -/-                                                                                                                                   | 202/404  | -/-                                                                     |
| GET /api/feedbacks/competencies/average?username={:username}&userGroupname={:userGroupname} | -/-                                                                                              | 200/400  | Calculates an competency matrix                                         |
| GET /api/feedbacks/requests?addresser={:username}&username={:username}&userGroupname={:userGroupname} | -/-                                                                                    | 200      | List of Feedback Requests entities (opt filter by requester/requestees) |
| GET /api/feedbacks/requests/{:id}                      | -/-                                                                                                                                   | 200/404  | Feedback request entity with id == :id                                  |
| POST /api/feedbacks/requests                           | { "adresser": string(username), "username": string(requestee)?, "userGroupname": string(requestee)?}                                  | 200      | Created Feedback Request entity                                         |
| DELETE /api/feedbacks/requests/{:id}                   | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/feedbacks/mine/inbound                        | -/-                                                                                                                                   | 200/401  | List of Feedback left by this authorized user on other employees        |
| GET /api/feedbacks/mine/outbound                       | -/-                                                                                                                                   | 200/401  | List of Feedback left by other employees on this authorized user        |
| GET /api/feedbacks                                     | -/-                                                                                                                                   | 200      | List of Feedback entities                                               |
| GET /api/feedbacks/{:id}                               | -/-                                                                                                                                   | 200/404  | Feedback entity with id == :id                                          |
| POST /api/feedbacks                                    | { "formId": objectId, "summary": string, "competencies": \[ { "characteristicId": objectId, "grade": number(0,10) } ] }               | 200      | Created Feedback entity                                                 |
| DELETE /api/feedbacks/{:id}                            | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/forms                                         | -/-                                                                                                                                   | 200      | List of Forms entities                                                  |
| GET /api/forms?userGroupname={:usrGroupname}           | -/-                                                                                                                                   | 200      | List of Forms entities assigned to user group with :userGroupname       |
| GET /api/forms/{:id}                                   | -/-                                                                                                                                   | 200/404  | Form entity with id == :id                                              |
| POST /api/forms                                        | { "name": string, "userGroupname": string, "description": string?, "matrixId": objectId }                                             | 200      | Created Form entity                                                     |
| DELETE /api/forms/{:id}                                | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/matrices                                      | -/-                                                                                                                                   | 200      | List of Matrices entities                                               |
| GET /api/matrices/{:id}                                | -/-                                                                                                                                   | 200/404  | Matrix entity with id == :id                                            |
| POST /api/matrices                                     | { "name": string, "characteristics": \[ { "name": string, "description": string } ] }                                                 | 200      | Created Matrix entity                                                   |
| DELETE /api/matrices/{:id}                             | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/plans                                         | -/-                                                                                                                                   | 200      | List of Plans entities                                                  |
| GET /api/plans/{:id}                                   | -/-                                                                                                                                   | 200/404  | Plan entity with id == :id                                              |
| POST /api/plans                                        | { "name": string, "price": number, "feedbackLimit": number, "userLimit": number, "advancedSupport": boolean }                         | 200      | Created Plan entity                                                     |
| PUT /api/plans/{:id}                                   | { "name": string?, "price": number?, "feedbackLimit": number?, "userLimit": number?, "advancedSupport": boolean? }                    | 200/404  | Updated Plan entity                                                     |
| DELETE /api/plans/{:id}                                | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/reports                                       | -/-                                                                                                                                   | 200      | List of Reports entities                                                |
| GET /api/reports/{:id}                                 | -/-                                                                                                                                   | 200/404  | Report entity with id == :id                                            |
| POST /api/reports                                      | { "username": string?, userGroupname: string?, "document": string }                                                                   | 200      | Created Report entity                                                   |
| DELETE /api/reports/{:id}                              | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/reports                                       | -/-                                                                                                                                   | 200      | List of Reports entities                                                |
| GET /api/reports/{:id}                                 | -/-                                                                                                                                   | 200/404  | Report entity with id == :id                                            |
| POST /api/reports                                      | { "username": string?, userGroupname: string?, "document": string }                                                                   | 200      | Created Report entity                                                   |
| DELETE /api/reports/{:id}                              | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/users                                         | -/-                                                                                                                                   | 200      | List of Users entities                                                  |
| GET /api/users/{:id}                                   | -/-                                                                                                                                   | 200/404  | User entity with id == :id                                              |
| PUT /api/users/{:id}                                   | { "type": enum(MANAGER,EMPLOYEE)?, "name": string?, "username": string?, "email": string?, "password": string?, "position": string? } | 200/404  | Updated User entity                                                     |
| DELETE /api/users/{:id}                                | -/-                                                                                                                                   | 202/204  | -/-                                                                     |
| GET /api/usergroups                                    | -/-                                                                                                                                   | 200      | List of UserGroup entities                                              |
| GET /api/usergroups/{:id}                              | -/-                                                                                                                                   | 200/404  | UserGroup entity with id == :id                                         |
| GET /api/usergroups/{:id}/members                      | -/-                                                                                                                                   | 200/404  | List of Users of UserGroup with given :id                               |
| PUT /api/usergroups/{:id}/members/{:usrname}           | -/-                                                                                                                                   | 200/404  | Adds a User with username === :usrname to UserGroup with given :id      |
| DELETE /api/usergroups/{:id}/members/{:usrname}        | -/-                                                                                                                                   | 200/404  | Removes a User with username === :usrname from UserGroup with given :id |
| POST /api/usergroups                                   | { "userGroupname": string!, "description": string?, "usernames": \[string!]? }                                                        | 200      | Created UserGroup entity                                                |
| PUT /api/usergroups/{:id}                              | { "userGroupname": string?, "description": string?, "usernames": \[string!]? }                                                        | 200/404  | Updated UserGroup entity                                                |
| DELETE /api/usergroups/{:id}                           | -/-                                                                                                                                   | 202/204  | -/-                                                                     |

* **type?** - optional 
* **type!** - unique 

Postman examples are available [here](https://www.getpostman.com/collections/6e5f6a01b7a1435338af) (auth dropped).

## Team
- ILLIA OVCHYNNIKOV (@wingsofovnia)
- MARK WILSON (@markywilson)
- ANIL KARATAS (@NiggyWizzyWoz)
- BURAK ÖZAFSAR (@PigJuicer)

## Credits

Backend is based on [Express & ES6 REST API Boilerplate](https://github.com/developit/express-es6-rest-api).

## License

Except where noted, software in this repository is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
