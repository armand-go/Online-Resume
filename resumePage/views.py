from django.contrib import messages
from django.core.exceptions import ValidationError
from django.core.mail import BadHeaderError, send_mail
from django.core.validators import validate_email
from django.urls import reverse
from django.shortcuts import render, redirect

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

        try:
            context["sections"] = Section.objects.all().order_by('order')
        except Section.DoesNotExist:
            context["sections"] = 'Error'

        return context

    def get(self, request):
        return render(request, self.template_name, self.get_context_data())

    def post(self, request):
        if request.POST.get('honey'):
            messages.error(request, "Something went wrong, please try again.")
            return redirect(reverse('resume') + '#contact')


        name = request.POST.get('name').strip();
        mail = request.POST.get('mail').strip();
        subject = request.POST.get('subject').strip();
        mess = request.POST.get('message').strip();

        if (name and mail and subject and mess):
            try:
                validate_email(mail)
            except ValidationError as e:
                messages.warning(request, "Enter a valid email.")
                return redirect(reverse('resume') + '#contact')

            try:
                send_mail(
                    subject = subject,
                    message = mess,
                    from_email = mail,
                    recipient_list = ['armdgnthr@gmail.com'],
                )
            except BadHeaderError:
                messages.error(request, "Something went wrong, please try again.")
                return redirect(reverse('resume') + '#contact')
            messages.success(request, "Email successfuly sent!")
        else:
            messages.error(request, 'Please fill in all the fields.')

        return redirect(reverse('resume') + '#contact')
