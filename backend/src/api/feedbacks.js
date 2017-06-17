import resource from 'resource-router-middleware';
import Feedback from '../models/feedback';
import FeedbackCompetency from '../models/feedback_competency';
import MatrixCharacteristic from '../models/matrix_characteristic';

export default ({config, db}) => resource({

    // GET / - List all entities
    async index({}, res) {
        const feedbacks = await Feedback.find().populate("competencies").populate("competencies.characteristic");
        res.json(feedbacks);
    },

    // GET /:id - Return a given entity
    async read({id}, res) {
        const feedback = await Feedback.findOne({_id: id}).populate("competencies").populate("competencies.characteristic");
        res.json(feedback);
    },

    // POST / - Create a new entity
    async create({body}, res) {
        let {summary, competencies} = body;

        const persistedFeedback = await new Form({
            summary: summary
        }).save();


        for (let cpt in competencies) {
            if (competencies.hasOwnProperty(cpt)) {
                let {characteristic, grade} = chr;

                var matrixCharacteristicId = null;

                // Characteristic can be provided as InstanceId (_id) or plain object.
                // Last should not duplicate MatrixCharacteristics
                if (typeof characteristic === "object" && !Array.isArray(characteristic)) {
                    let {name, description} = characteristic;
                    const mtxChr = await MatrixCharacteristic.findOne({
                        name: name,
                        description: description
                    });
                    if (mtxChr) matrixCharacteristicId = mtxChr._id;
                } else {
                    const mtxChr = await MatrixCharacteristic.findOne({_id: characteristic});
                    if (mtxChr) matrixCharacteristicId = mtxChr._id;
                }

                if (!matrixCharacteristicId) {
                    res.sendStatus(404).send("MatrixCharacteristic not found " + JSON.stringify(characteristic));
                    break;
                }

                await new FeedbackCompetency({
                    _creator: persistedFeedback._id,
                    characteristic: matrixCharacteristicId,
                    grade: grade
                }).save();
            }
        }

        res.sendStatus(200);
    },

    // DELETE /:id - Delete a given entity
    async delete({id}, res) {
        const feedback = await Feedback.findOne({_id: id}).populate("competencies");

        for (let cpt in feedback.competencies) {
            if (feedback.competencies.hasOwnProperty(cpt)) {
                await FeedbackCompetency.destroy({_id: cpt._id});
            }
        }

        await Feedback.destroy({_id: id});

        res.sendStatus(204);
    }
});
