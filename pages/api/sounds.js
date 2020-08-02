const fs = require('fs');

let db = require('../../data/db.json');
let saveDb = (next) => {
  fs.writeFile('/var/www/beat/data/db.json', JSON.stringify(db, null, 4), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    next();
  });
};

export default (req, res) => {
  console.log(req.method, req.query);
  if (req.method === "GET") {
    res.status(200).json(db.sounds)
  }
  if (req.method === "POST") {
    let sound = req.body;
    db.sounds.push(req.body);
    saveDb(() => res.status(200).json(sound));
  }
  if (req.method === "DELETE") {
    let id = req.query.id;
    let sound = db.sounds.find((sound) => sound.id === id);
    db.sounds = db.sounds.filter((sound) => sound.id !== id);
    saveDb(() => res.status(200).json(sound));
  }
};
