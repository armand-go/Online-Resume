from django.shortcuts import render

from django.views.generic import TemplateView

# Create your views here.
def index(request):
    return render(request, 'resumePage/index.html')

class ResumeView(TemplateView):
    template_name = 'resumePage/index.html'
