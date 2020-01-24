const Training = require('../models/Training');

module.exports = {
    async index(page) {
        try {
            return await Training.paginate({}, { page, limit: 10 });
        } catch(err) {
            return err;
        }
    },

    async show(_id) {
        try {
            return await Training.findById(_id);
        } catch(err) {
            return err;
        }
    },

    async store(training) {
        try {
            return Training.create(training);
        } catch(err) {
            return err;
        }
    },

    async update(_id, _idExercice, exercice) {
        try {
            const { sequence } = exercice;
            const { repetition } = exercice;

            return await Training.findOne(
                { _id }, 
            ).then((training) => {
                const pos = training.exercices.findIndex(exercice => exercice._id == _idExercice);
                
                if (sequence) training.exercices[pos].sequence = sequence; 
                if (repetition) training.exercices[pos].repetition = repetition;

                return training.save();
            });
        } catch(err) {
            return err;
        }
    },

    async updateExercice(_id, exercice) {
        try {
            return await Training.findByIdAndUpdate(
                _id,
                { $push: { exercices: exercice}},
                { useFindAndModify: false, new: true }
            );
        } catch(err) {
            return err;
        }
    },

    async destroy(_id) {
        try {
            await Training.findByIdAndRemove(_id, { useFindAndModify: false });

            return { msg: 'Treino removido com sucesso' };
        } catch(err) {
            return err;
        }
    },

    async destroyExercice(_id, _idExercice) {
        try {
            return await Training.findByIdAndUpdate(
                _id,
                { $pull: { exercices: { _id: _idExercice }}},
                { useFindAndModify: false, new: true }
            );
        } catch(err) {
            return err;
        }
    }
}