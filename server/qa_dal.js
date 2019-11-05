class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            question: String,
            answers: [{ answer: String, votes: Number }]
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);

        try {
            return question.save();
        } catch (error) {
            console.error("createQuestion:", error.message);
            return {};
        }
    }

    async postAnswer(questionId, answer) {
        const question = await this.getQuestion(questionId);
        question.answers.push(answer);

        try {
            return question.save();
        } catch (error) {
            console.error("postAnswer:", error.message);
            return {};
        }
    }

    async getAnswer(question, answerId) {
        try {
            return await question.answers.find(answer => answer._id == answerId);
        } catch (error) {
            console.error("getAnswer:", error.message);
            return {};
        }
    }

    async upvote(questionId, answerId) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);
        const answer = this.getAnswer(question, answerId);
        answer.votes = answer.votes + 1;

        return question.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        const hobbies = ['sleeping', 'purring', 'eating', 'people watching'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomName() {
            return ['Garfield', 'Tom', 'Felix', 'Snowball'][getRandomInt(0, 3)]
        }

        function getRandomHobbies() {
            const shuffled = hobbies.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1, shuffled.length));
        }

        let l = (await this.getQuestions()).length;
        console.log("Kitten collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let kitten = new this.questionModel({
                    name: getRandomName(),
                    hobbies: getRandomHobbies()
                });
                promises.push(kitten.save());
            }

            return Promise.all(promises);
        }
    }

    /** Random test data to the database
   * This method adds a bunch of test data if the database is empty.
   * @param count The amount of questions to add.
   * @returns {Promise} Resolves when everything has been saved.
   */
    async bootstrap(count = 10) {
        const answers = [
            { answer: "What exactly is your question?", votes: 2 },
            { answer: "Sorry, I don't know the answer.", votes: 3 },
            { answer: "Have you tried to Google it?", votes: 0 },
            { answer: "This is a testing answer.", votes: 3 },
            { answer: "Check this answer.", votes: 0 }
        ];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomQuestion() {
            return [
                "Is there a cleaner way to write this boolean comparison in Python?",
                "How can I make a synchronous response to a GET method in JavaScript?",
                "How to sort a list by number and if duplicated sort by string?",
                "What is the difference between React Native and React?"
            ][getRandomInt(0, 3)];
        }

        function getRandomAnswers() {
            const shuffled = answers.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1, shuffled.length));
        }

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.questionModel({
                    question: getRandomQuestion(),
                    answers: getRandomAnswers()
                });
                promises.push(question.save());
            }
            return Promise.all(promises);
        }
    }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);
