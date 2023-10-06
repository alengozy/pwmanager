from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .forms import RegistrationForm
# Create your views here.
def register_request(request):
	if request.method == "POST":
		form = RegistrationForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("homepage")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = RegistrationForm()
	return render (request=request, template_name="register.html", context={"register_form":form})

def homepage(request):
	return render(request=request, template_name='homepage.html')