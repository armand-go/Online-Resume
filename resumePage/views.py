from django.shortcuts import render

from django.views.generic import TemplateView
from .models import Introduction

# Create your views here.

class ResumeView(TemplateView):
    template_name = 'resumePage/index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        try:
            context['intro'] = Introduction.objects.get(pk=1)
        except Introduction.DoesNotExist:
            return 'error'
        return context

    def get(self, request):
        return render(request, self.template_name, self.get_context_data())
