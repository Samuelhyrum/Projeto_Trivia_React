import getToken from './storage';

const getQuestions = async () => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken()}`);
  const validRequest = await response.json();
  return validRequest;
};

export default getQuestions;
