from django.shortcuts import render

from django.views.generic import TemplateView
from .models import Introduction, Section, Content

# Create your views here.
class ResumeView(TemplateView):
    template_name = 'resumePage/index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        try:
            context['intro'] = Introduction.objects.get(surname='Gonthier')
        except Introduction.DoesNotExist:
            context['intro'] = 'Error'

        subcontent = Content.__subclasses__()

        try:
            context["sections"] = Section.objects.all().order_by('order')
        except Section.DoesNotExist:
            context["sections"] = 'Error'

        for section in context["sections"]
        for sub in subcontent:
            try:


        return context

    def get(self, request):
        return render(request, self.template_name, self.get_context_data())
