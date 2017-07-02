import resource from 'resource-router-middleware';
import Form from '../models/form';
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
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  },

  // GET /:id - Return a given entity
  async read({feedback}, res) {
    res.json(feedback);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {formId, summary, competencies} = body;

    if (competencies.length === 0) {
      failure(res, 'At least one competencies is required');
      return;
    }

    const persistedForm = await Form.findById(formId);
    if (!persistedForm) {
      failure(res, 'No form found with given id');
      return;
    }

    const persistedFeedback = await new Feedback({
      summary: summary,
      form: persistedForm._id,
      competencies: []
    }).save();

    console.log(persistedFeedback);

    const persistedCompetencyIds = [];
    for (let i = 0; i < competencies.length; i++) {
      const competency = competencies[i];
      const {characteristicId, grade} = competency;

      const mtxChr = await MatrixCharacteristic.findById(characteristicId);
      if (!mtxChr) {
        failure(res, 'No MatrixCharacteristic found with given id');
        return;
      }

      console.log('before FeedbackCompetency');
      const persistedCompetency = await new FeedbackCompetency({
        _creator: persistedFeedback._id,
        characteristic: mtxChr._id,
        grade: grade
      }).save();
      console.log('after FeedbackCompetency');

      persistedCompetencyIds.push(persistedCompetency._id);
    }

    persistedFeedback.competencies = persistedCompetencyIds;
    await Feedback.update(persistedFeedback);

    res.sendStatus(200);
  },

  // DELETE /:id - Delete a given entity
  async delete({feedback}, res) {

    for (let i = 0; i < feedback.competencies.length; i++) {
      await FeedbackCompetency.remove(feedback.competencies[i]);
    }

    await Feedback.remove(feedback);

    res.sendStatus(204);
  }
});
