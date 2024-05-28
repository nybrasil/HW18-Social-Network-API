const connection = require('../config/connection');
const { User, Thought } = require('../models');
let users = [
  {
    username: 'user1',
    email: 'user1@email.com',
  },
  { 
    username: 'user2',
    email: 'user2@email.com',
  }, 
{
  username: 'user3',
  email: 'user3@email.com',
}
]

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  
 

  

  await User.insertMany(users);
  

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});