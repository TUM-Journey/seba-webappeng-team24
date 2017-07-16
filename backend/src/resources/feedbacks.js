import resource from 'resource-router-middleware';
import Form from '../models/form';
import User from '../models/user';
import UserGroup from '../models/user_groups';
import Feedback from '../models/feedback';
import FeedbackCompetency from '../models/feedback_competency';
import MatrixCharacteristic from '../models/matrix_characteristic';
import { failure } from '../lib/util';
import mapToObject from 'map-to-object'

function calculateAverageMatrix(competencies) {

  const avgMatrix = new Map();

  competencies.forEach(competency => {
    const characteristicName = competency.characteristic.name;
    const characteristicGrade = competency.grade;

    const avgMatrixCharacteristicGrades = avgMatrix.get(characteristicName);
    if (avgMatrixCharacteristicGrades) {
      avgMatrixCharacteristicGrades.push(characteristicGrade);
    } else {
      avgMatrix.set(characteristicName, [characteristicGrade]);
    }
  });

  avgMatrix.forEach((characteristicGrades, characteristicName) => {
    const characteristicGradesSum = characteristicGrades.reduce((a, b) => a + b);
    const characteristicGradesAvg = characteristicGradesSum / characteristicGrades.length;

    avgMatrix.set(characteristicName, characteristicGradesAvg.toFixed(1));
  });

  return mapToObject(avgMatrix);
}

export default ({ config, db }) => resource({

  id: 'feedback',

  // Preloads resource for requests with :username placeholder
  async load(req, id, callback) {
    const feedback = await Feedback.findById(id)
      .populate('competencies')
      .populate('author')
      .populate('user')
      .populate('userGroup')
      .populate({
        path: 'competencies',
        populate: {
          path: 'characteristic',
          model: 'MatrixCharacteristic'
        }
      });

    const errorCode = feedback ? null : '404';

    callback(errorCode, feedback);
  },

  // GET / - List all entities (opt filter ?author={} &username={} &userGroupname={})
  async list(req, res) {
    let searchParams = {};
    if (req.query.author) {
      const persistedAuthor = await User.findOne({ username: req.query.author });

      if (!persistedAuthor) {
        res.json({});
        return;
      }

      searchParams = { author: persistedAuthor._id };
    }

    if (req.query.userGroupname) {
      const persistedUserGroup = await UserGroup.findOne({ userGroupname: req.query.userGroupname });

      if (!persistedUserGroup) {
        res.json({});
        return;
      }

      searchParams = { userGroup: persistedUserGroup._id };
    } else if (req.query.username) {
      const persistedUser = await User.findOne({ username: req.query.username });

      if (!persistedUser) {
        res.json({});
        return;
      }

      searchParams = { user: persistedUser._id };
    }

    const feedbacks = await Feedback.find(searchParams)
      .populate('competencies')
      .populate('author')
      .populate('user')
      .populate('userGroup')
      .populate({
        path: 'competencies',
        populate: {
          path: 'characteristic',
          model: 'MatrixCharacteristic'
        }
      });
    res.json(feedbacks);
  },

  // GET /:id - Return a given entity
  async read({ feedback }, res) {
    res.json(feedback);
  },

  // POST / - Create a new entity
  async create({ body }, res) {
    let { formId, author, username, userGroupname, summary, competencies } = body;

    if (author === username) {
      failure(res, "You cant leave feedback on yourself", 400);
      return;
    }

    if (competencies.length === 0) {
      failure(res, 'At least one competencies is required', 400);
      return;
    }

    const persistedAuthor = await User.findOne({ username: author });
    if (!persistedAuthor) {
      failure(res, 'No user found with given username', 404);
      return;
    }

    const persistedUser = await User.findOne({ username: username });
    const persistedGroup = await UserGroup.findOne({ userGroupname: userGroupname });

    if (!persistedUser && !persistedGroup) {
      failure(res, "No user or userGroup (adressees) found with given username/userGroupname", 404);
      return;
    }

    const persistedForm = await Form.findById(formId);
    if (!persistedForm) {
      failure(res, 'No form found with given id', 404);
      return;
    }

    const newFeedbackData = {
      author: persistedAuthor._id,
      summary: summary,
      form: persistedForm._id,
      competencies: []
    };
    if (persistedUser)
      newFeedbackData['user'] = persistedUser._id;
    else if (persistedGroup)
      newFeedbackData['userGroup'] = persistedGroup._id;

    const feedback = await new Feedback(newFeedbackData);

    const persistedCompetencyIds = [];
    for (let i = 0; i < competencies.length; i++) {
      const competency = competencies[i];
      const { characteristicId, grade } = competency;

      const mtxChr = await MatrixCharacteristic.findById(characteristicId);
      if (!mtxChr) {
        failure(res, 'No MatrixCharacteristic found with given id');
        return;
      }

      const persistedCompetency = await new FeedbackCompetency({
        _creator: feedback._id,
        characteristic: mtxChr._id,
        grade: grade
      }).save();

      persistedCompetencyIds.push(persistedCompetency._id);
    }

    feedback.competencies = persistedCompetencyIds;
    await feedback.save();

    res.status(200).send(feedback);
  },

  // DELETE /:id - Delete a given entity
  async delete({ feedback }, res) {

    for (let i = 0; i < feedback.competencies.length; i++) {
      await FeedbackCompetency.remove(feedback.competencies[i]);
    }

    await Feedback.remove(feedback);

    res.sendStatus(202);
  }
})
  // GET /matrix - Calculates an average matrix (opt filter &username={} &userGroupname={})
  .get('/competencies/average', async (req, res) => {
    if (!req.query.userGroupname && !req.query.username)
      return failure(res, "UserGroupname or username query parameter is required", 400);

    let searchParams = {};
    if (req.query.userGroupname) {
      const persistedUserGroup = await UserGroup.findOne({ userGroupname: req.query.userGroupname });

      if (!persistedUserGroup)
        return failure(res, "Cant find requested user group", 400);

      searchParams = { userGroup: persistedUserGroup._id };
    } else if (req.query.username) {
      const persistedUser = await User.findOne({ username: req.query.username });

      if (!persistedUser)
        return failure(res, "Cant find requested user", 400);

      searchParams = { user: persistedUser._id };
    }

    const feedbacks = await Feedback.find(searchParams)
      .populate('competencies')
      .populate('author')
      .populate('user')
      .populate('userGroup')
      .populate({
        path: 'competencies',
        populate: {
          path: 'characteristic',
          model: 'MatrixCharacteristic'
        }
      });

    const feedbackCompetencies = [];
    feedbacks.forEach(feedback => {
      feedback.competencies.forEach(competency => feedbackCompetencies.push(competency));
    });

    const avgMatrix = calculateAverageMatrix(feedbackCompetencies);

    res.json(avgMatrix);
  })
  // GET /mine - List of feedbacks on this user
  .get('/mine/inbound', async (req, res) => {
    if (!req.user)
      return failure(res, "Not authorized", 401);
    else if (!req.user.id)
      return failure(res, "Failed to retrieve user id (no auth mode?)");

    const meUserId = req.user.id;

    const feedbacks = await Feedback.find({ user: meUserId })
      .populate('competencies')
      .populate('author')
      .populate('user')
      .populate('userGroup')
      .populate({
        path: 'competencies',
        populate: {
          path: 'characteristic',
          model: 'MatrixCharacteristic'
        }
      });

    res.json(feedbacks);
  })
  // GET /mine - List of feedbacks left by this user
  .get('/mine/outbound', async (req, res) => {
    if (!req.user)
      return failure(res, "Not authorized", 401);
    else if (!req.user.id)
      return failure(res, "Failed to retrieve user id (no auth mode?)");

    const meUserId = req.user.id;

    const feedbacks = await Feedback.find({ author: meUserId })
      .populate('competencies')
      .populate('author')
      .populate('user')
      .populate('userGroup')
      .populate({
        path: 'competencies',
        populate: {
          path: 'characteristic',
          model: 'MatrixCharacteristic'
        }
      });

    res.json(feedbacks);
  });
