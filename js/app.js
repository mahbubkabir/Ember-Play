App = Ember.Application.create();

App.Router.map(function () {
    // this.resource('newstory', {path: 'story/new'});
    // can be expressed as the following
    this.resource('newstory', {path: 'story'}, function () {
        this.route('new', {path: 'new'}); // to access this route, we need to use {{#link-to 'newstory.new'}} notice the DOT
    });

    this.resource('index', {path: '/'}, function(){
       this.resource('story', {path: '/stories/:story_id'});
    });

    //http://stackoverflow.com/questions/18528849/how-to-use-html5-local-storage-with-ember-js
});

// to store stories, every time we add one needs to go in here
var data = [];

// http://code.tutsplus.com/tutorials/getting-into-ember-js-part-3--net-31394
App.Story = Ember.Object.extend();

/*
 {
 url : null,
 tags : null,
 fullname : null,
 title : null,
 excerpt : null,
 submittedOn : null
 }
 */


// what is an object controller
// note the name of the controller, Ember expects the controller to be exactly same as it wants
App.NewstoryNewController = Ember.ObjectController.extend({

    actions: {
        save: function () {
            var url = $('#url').val(),
                tags = $('#tags').val(),
                fullname = $('#fullname').val(),
                title = $('#title').val(),
                excerpt = $('#excerpt').val(),
                submittedOn = new Date();

            //http://eviltrout.com/2013/03/23/ember-without-data.html
            var store = App.Story.create({
                url: url,
                tags: tags,
                fullname: fullname,
                title: title,
                excerpt: excerpt,
                submittedOn: submittedOn
            });
            data.pushObject(store);
            this.transitionToRoute('index');
        }
    }
});

App.IndexRoute = Ember.Route.extend({
    model: function () {
        return data;
    }
});


App.StoryRoute = Ember.Route.extend({
    model: function(params){
        console.log(params);
        return data.find(function (callback, target) {
            console.log(callback);
            console.log(target);
        })
    }
});
