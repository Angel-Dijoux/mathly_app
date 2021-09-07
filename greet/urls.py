from django.http import request
from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns= [
    path('', views.home, name="home_page"),
    path('home', views.home, name="home_page"),
    path('poly',views.poly, name='polynome'),
    path('add', views.add, name="add"),
    path('trigo', views.trigo, name="trigo"),
    path('add_trigo', views.add_trigo, name="add_trigo")

]