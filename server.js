const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/server');

//Si bien esto no esta mal, particularmente prefiero crear los modelos en un directorio aparte.
const Post = mongoose.model('Post', { title: String, body: String });

const app = express();

app.use(express.json());

// Aca no hay nada malo, pero lo ideal seria que tambien esto este en unas variables de entorno y/o que sean declaradas mediante constantes.
// La api_key si bien no se usa en este caso, tambien deberia estar en las variables de entorno.
PORT = 3000;
PRIVAVE_API_KEY = 'api_key';

// Aca practicamente no esta del todo mal, pero lo ideal seria que req este sin el underscore previo.
// Y dentro del res.json, encerraria con {} a posts, asi es mas declarativa la respuesta.
app.get('/posts', async (_req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

// En este caso la escritura de un nuevo post no funcionaria por que por que no se esta instanciando el modelo Post.
// Despues faltaria agregar el await antes del Post.create(). 
app.post('/posts/create', async (req, res) => {
  const {
    title,
    body,
  } = req.body;

  const newPost = Post.create({ title, body });

  return res.status(201).send(newPost);
});

// Borrar la entrada de la siguiente manera no va a funcionar por una cuestion de que se hacen varias cosas mal, como por ejemplo
// Se usa un metodo POST, cuando este solo se usa a la hora de hacer escritura.
// Tampoco se especifica en la url mediante que referencia se borraria el post, un ejemplo seria "/posts/delete/:id".
// Tambien al Modelo de Post se le añade el metodo delete, y este metodo no existe en mongoose.
app.post('/posts/delete', (req, res) => {
  const {
    params: {
      id: _id,
    },
  } = req;

  const post = await Post.delete({ _id });

  return res.send();
});

// La siguiente petición GET funcionaria, pero no es lo ideal usar find, ya que el metodo find de mongoose filtra todo dentro en un Array.
// Lo optimo seria usar findById ya que esto nos muestra post que buscamos dentro de un objeto.
app.get('/posts/:id', async (req, res) => {
  const {
    params: {
      id: _id,
    },
  } = req;

  const post = await Post.find({ _id });

  return res.json(post);
});

// En este caso se hace uso del metodo post y esto tampoco funcionaria, ya que el que se usa para actualizar un item existente se utiliza el metodo put
// Ademas si queremos usar como param el id para actualizar el post, no funcionaria ya que estamos metiendo el id dentro del body y no del param.
// Tambien si queremos actualizar un item no funcionaria usando el metodo update, ya que para actualizar por id se usa el metodo findByIdAndUpdate.
// Tampoco aclaramos en la url del endpoint como referenciamo el item a editar, en este caso faltaria en la url el :id.
app.post('/posts/update', async (req, res) => {
  const {
    body: {
      id: _id,
      title,
      body,
    },
  } = req;

  const newPost = await Post.update({ _id: id }, { $set: { title, body }});

  return res.json(newPost);
})

app.listen(PORT, () => {
  console.log('Listening');
});