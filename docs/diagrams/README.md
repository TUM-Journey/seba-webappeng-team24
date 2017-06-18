# Project Diagrams
This dir contains diagrams related to design of the system. Except where noted, diagrams are made with [draw.io](https://draw.io/).

## Entity Class Diagram
![cd-evaluatione-entities-v0 3 7](https://user-images.githubusercontent.com/5632544/27259435-a3c6f36a-5413-11e7-929c-a9e35b4cb8a5.png)

- **Form** - definitions of feedback forms (e.g. 'Feedback form for Java developers')
- **Matrix** - definitions of competency matrixes (e.g. 'Matix of Competencies for Java devs')
- **MatrixCharactiristic** - definitions of matrixes' competencies (e.g. 'Java Core', 'Leadership')
- **Feedback** - a feedback left by emploee X on emploee Y
- **Competency** - a grade given by employee X that evaluates emploee Y's competency in specific MatrixCharactiristic (e.g. 'Java Core' 5 out of 10, 'Leadership' - 9/10).
- **Customer#domain** - an email domain used to restrict user registrations (slack-like)
- 'out of X' is a max value of the hardcoded scale