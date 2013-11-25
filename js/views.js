/*
    TemplateView

    Simple template merge view object. This can merge
    a model with a given HTML template by matching model
    property names to element class names.
    
    Used as prototype by createTemplateView()
*/
var TemplateView = {
    render: function() {
        var propVal;        
        var targetElem;     
        var targetTagName;  

        var clonedTemplate = this.template.clone();

        for (prop in this.model) {

            targetElem = clonedTemplate.find('.' + prop);
            if (targetElem.length > 0) {
                propVal = this.model[prop];
                targetTagName = targetElem.prop('tagName').toLowerCase();
                if ('img' === targetTagName) {
                    targetElem.attr('src', this.model[prop]);
                }
                else if ('a' == targetTagName) {
                    targetElem.attr('href', this.model[prop]);
                }
                else {
                    targetElem.html(this.model[prop]);
                }
            }
        } 
        this.container.append(clonedTemplate);
        if (this.afterRender)
            this.afterRender(clonedTemplate, this.model);

        return clonedTemplate;

    }    
}; 

/*  
    createTemplateView()

    Creates a simple single-object template view, which knows
    how to merge a single model object (POJO) with an HTML
    template block, matching property names to element style
    class names.

    The config parameter should be an object with the following properties:
    
    model (object) the model for the view
    template (jQuery object) reference to the HTML template for the view
    container (jQuery object) refernece to the container into which
                            the view should append the merged template    
*/
function createTemplateView(config) {
    var view = Object.create(TemplateView);
    apply(config, view);
    view = makeEventSource(view);

    return view;
} 


/*
    TemplateListView

    Simple view object that iterates the items in a ListModel
    and merges each with a TemplateView

    Used as prototype by createTemplateListView()
*/
var TemplateListView = {
    render: function() {
        var templateView = this.templateView || createTemplateView({
            template: this.template,
            container: this.container
        });

        var items = this.model.getItems();
        var idx;

        this.container.empty();

        if (items && items.length && items.length > 0) {
            for (idx = 0; idx < items.length; ++idx) {
                templateView.model = items[idx];
                templateView.render();
            }
        }
        if (this.afterRender)
            this.afterRender();

    }    
}

/*  
    createTemplateListView()

    Creates a simple template list view, which works with a ListModel
    This iterates over the items and uses a single-object template view 
    to render each model object in the array.

    The config parameter should be an object with the following properties:
    
    - model (ListModel) the model for the view
    - template (jQuery object) reference to the HTML template for the view
    - container (jQuery object) refernece to the container into which
                            the view should append the merged template

    the config may also include these optional properties:

    - templateView (object) instance of a template view to use for each object

*/
function createTemplateListView(config) {
    var view = Object.create(TemplateListView);
    apply(config, view);
    view = makeEventSource(view);
    view.model.on('change', function(){
        view.render();
    }, view);
    return view;
} 