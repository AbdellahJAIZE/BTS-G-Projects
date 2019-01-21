var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    createdAt: {type: Date, default: Date.now}
});

var Note = module.exports = mongoose.model('Note', NoteSchema);

module.exports.add = function(note) {
    new Note (note).save(function (err, data) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        
        res.send(data);
    });
}

module.exports.edit = function(note) {
    Note.findByIdAndUpdate(note.id, note, function (err, data) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        
        res.send(data);
    });
}

module.exports.delete = function(idNote) {
    Note.remove({_id: idNote}).exec(function (err) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        
        res.status(200).send();
    });
}
