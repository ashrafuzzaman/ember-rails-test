Stories = Ember.Application.create();

Stories.Story = Ember.Object.extend({
  id: null,
  title: null,
  description: null,
  status: null,
});


Stories.storiesController = Ember.ArrayProxy.create({
  content: [],
  updateContent: function () {
		$.getJSON('/stories.json',function(data){
		    Stories.storiesController.set('content', []);
		    $(data).each(function(index,value){
		        var s = Stories.Story.create({
		            id: value.id,
		            title: value.title,
		            description: value.description,
		            status: value.status
		        });
		        Stories.storiesController.pushObject(s);
		    })
		});
		//frequently update data
		setTimeout(Stories.storiesController.updateContent, 10000);
  }
});

Stories.storiesController.updateContent();

Stories.StoryView = Ember.View.extend({
  tagName: 'div',
  content: null,

  editStory: function() {
    story = this.getPath('content');
    alert(story.title);
  },

  removeStory: function(){
    story = this.getPath('content');
    Stories.storiesController.removeObject(story);
  }
});