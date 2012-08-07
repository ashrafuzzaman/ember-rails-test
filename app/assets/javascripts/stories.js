Stories = Ember.Application.create();

Stories.Story = Ember.Object.extend({
  id: null,
  title: null,
  description: null,
  status: null
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
  }
});

Stories.storiesController.updateContent();