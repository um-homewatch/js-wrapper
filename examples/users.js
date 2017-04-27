const Homewatch = require("../src/api");
const homewatch = new Homewatch("http://localhost:3000");

homewatch.users.register("José", "josesousa9000@gmail.com", "123456").
  then((response) => {
    console.log(response.data); // server response
  }, (err) => {
    console.log(err); // server error
  })
  .catch((err) => err); // runtine/internarl errors

/* should display something like this
{
  id: 1,
  name: 'José',
  email: 'josesousa9000@gmail.com',
  jwt: 'randomjwttoken'
}
*/
