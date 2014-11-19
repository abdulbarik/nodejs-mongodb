var http = require('http'),
 url=require('url'),
 mongoose    = require('mongoose');

//Use Member Model to store records
memberModel = require('../models/MemberModel');

// Open DB connection
mongoose.connect('mongodb://localhost/employee');

// Home page User Data Form
exports.index = function(req, res){
    memberModel.find({},function(err, members){
        res.render('list.jade', { title: 'User Form', members: members });
    });
};

// create user information
exports.createUser = function(req, res){
    res.render('create.jade', { title: 'User Form'});
};

// Member list page
exports.list = function(req, res){
    memberModel.find({},function(err, members){
        res.render('list.jade', { title: 'User Form', members: members });
    });
};

// user data insertion logic
exports.saveUser = function(req, res){
    member = new memberModel();
    member.eid = req.body.eid;
    member.name = req.body.name;
    member.location = req.body.location;
    member.edob = req.body.edob;
    member.edoj = req.body.edoj;
    
    member.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            res.redirect('/list');
        }
        else {
            console.log('Error '+err);
             res.render('update.jade', { title: 'User Form', member: member});
        }
    });
};

// Edit user details for updating
exports.editUser = function(req,res){
    var urltext = url.parse(req.url, true);
    var memberId = urltext.query.userid;
    memberModel.findOne({'_id': memberId},function(err, member){
        if(err){
            console.log('Error '+err);
        }

        res.render('update.jade', { title: 'User Form', member: member });

    });
};

//Update after editing
exports.updateUser = function(req,res){
    memberModel.findOne({'_id': req.body.id},function(err, member){
        if(err){
            console.log('Error'+ err);
        }

        member.eid = req.body.eid;
        member.name = req.body.name;
        member.location = req.body.location;
        member.edob = req.body.edob;
        member.edoj = req.body.edoj;

        member.save(function (err) {
             messages = [];
            errors = [];
            if (!err){
                res.redirect('/list');
            }
            else {
                console.log('Error' +err)
;                res.redirect('/update?userid='+req.body.id);
            }
        });
    });
};

// Delete user data
exports.deleteUser = function(req,res){
    var urltext = url.parse(req.url, true);
    var memberId = urltext.query.userid;
    memberModel.remove({'_id':memberId}, function(err, member) {
        messages = [];
        if (!err) {
           res.redirect('/list');
        }
        else{
            messages.push("Your information could not be deleted !");
        }
    });
};





