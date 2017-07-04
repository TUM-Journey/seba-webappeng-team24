import resource from 'resource-router-middleware';
import Form from '../models/form';
import User from '../models/user';
import Feedback from '../models/feedback';
import FeedbackCompetency from '../models/feedback_competency';
import MatrixCharacteristic from '../models/matrix_characteristic';
import {failure} from '../lib/util';

export default ({config, db}) => resource({

  id: 'feedback',

  // Preloads resource for requests with :username placeholder
  async load(req, id, callback) {
    const feedback = await Feedback.findById(id)
      .populate('competencies')
      .populate('author')
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

  // GET / - List all entities
  async list({}, res) {
    const feedbacks = await Feedback.find()
      .populate('competencies')
      .populate('author')
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
  async read({feedback}, res) {
    res.json(feedback);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {formId, author, summary, competencies} = body;

    if (competencies.length === 0) {
      failure(res, 'At least one competencies is required');
      return;
    }

    const persistedUser = await User.findOne({username: author});
    if (!persistedUser) {
      failure(res, 'No user found with given username');
      return;
    }

    const persistedForm = await Form.findById(formId);
    if (!persistedForm) {
      failure(res, 'No form found with given id');
      return;
    }

    const feedback = await new Feedback({
      author: persistedUser._id,
      summary: summary,
      form: persistedForm._id,
      competencies: []
    });

    const persistedCompetencyIds = [];
    for (let i = 0; i < competencies.length; i++) {
      const competency = competencies[i];
      const {characteristicId, grade} = competency;

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
  async delete({feedback}, res) {

    for (let i = 0; i < feedback.competencies.length; i++) {
      await FeedbackCompetency.remove(feedback.competencies[i]);
    }

    await Feedback.remove(feedback);

    res.sendStatus(202);
  }
});
