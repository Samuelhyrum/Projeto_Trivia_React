const mockData = {
    response_code: 0,
    results: [
      {
        category: 'Geography',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Greenland is almost as big as Africa.',
        correct_answer: 'False',
        incorrect_answers: [
          'True'
        ]
      },
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'medium',
        question: 'In Half-Life 2, if you play the zombies&#039; speech in reverse, they actually speak coherent English.',
        correct_answer: 'True',
        incorrect_answers: [
          'False'
        ]
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What was found in 1946 by two young shepards near a cave?',
        correct_answer: 'Dead Sea Scrolls',
        incorrect_answers: [
          'The Blackbeard Chest',
          'Sheep',
          'The First Oaxaca Cave Sleeper'
        ]
      },
      {
        category: 'Entertainment: Television',
        type: 'multiple',
        difficulty: 'easy',
        question: 'When Donkey Kong died in the &quot;Donkey Kong Country&quot; episode &quot;It&#039;s a Wonderful Life&quot;, who was his guardian angel?',
        correct_answer: 'Eddie the Mean Old Yeti',
        incorrect_answers: [
          'Kiddy Kong',
          'Diddy Kong',
          'King K. Rool'
        ]
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'hard',
        question: 'In &quot;The Witness&quot;, how many lasers must be activated to get into the mountain area?',
        correct_answer: '7',
        incorrect_answers: [
          '8',
          '5',
          '12'
        ]
      }
    ]
  }
  
  export default function mockFectApi() {
    return Promise.resolve({  json: () => Promise.resolve(mockData),})
  };

  