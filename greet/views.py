from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, redirect, render
from django.template import loader
from django.views import View
from django.core import serializers
import math
from json import dump, dumps

# Create your views here.
def home(request):
    return render(request, 'home.html')

def poly(request):
    return render(request, 'poly.html')
def trigo(request):
    return render(request, 'trigo.html')


def add(request): 
    entry_1 = request.POST['entry_1'] 
    entry_2 = request.POST['entry_2'] 
    entry_3 = request.POST['entry_3'] 
    entry_4 = request.POST['entry_4'] 
    verif_error = "this text verif error"
    if entry_1 and entry_2 and entry_3 and entry_4 != '':
        try:
            entry_1 = float(entry_1)
            entry_2 = float(entry_2)
            entry_3 = float(entry_3)
            result = (entry_2**2)-4*entry_1*(entry_3)
            center = -((entry_2)/2*(entry_1))
            if result > 0:
                racine_1 = (-entry_2+(math.sqrt(result)))/2*(entry_1)
                racine_1_float = float(racine_1)
                racine_1 = "Racine 1 : " + str(racine_1)
                racine_2 = (-entry_2-(math.sqrt(result)))/2*(entry_1)
                racine_2_float = float(racine_2)
                racine_2 = "Racine 2 : " + str(racine_2)
                facto  = str(entry_1)+'( x - '+ str(racine_1_float)+')( x - '+str(racine_2_float)+')'
                data = {
                    "discriminant": result,
                    "racine_1": racine_1,
                    "racine_2" : racine_2,
                    "factorisation": facto,
                    "entry_4": entry_4,
                    "center": center
                }
                dataJSON = dumps(data)
                return render(request, 'poly.html',{'data': dataJSON})
            elif result == 0: 
                racine_1  = -((entry_2)/2*(entry_1))
                racine_1_float = float(racine_1)
                racine_1 = "Unique racine : " + str(racine_1)
                facto  = str(entry_1)+'( x - '+ str(racine_1_float)+')^2'
                data = {
                     "discriminant": result,
                     "racine_1" : racine_1,
                     "factorisation": facto,
                     "entry_4": entry_4,
                     "center": center
                }
                dataJSON = dumps(data)
                return render(request, 'poly.html', {'data':dataJSON})
            elif result < 0:
                racine_1 = ("Aucune racines")
                facto = ("Aucune factorisation")
                data = {
                    "discriminant": result,
                    "racine_1": racine_1,
                    "factorisation": facto,
                    "entry_4": entry_4,
                    "center": center
                }
                dataJSON = dumps(data)
                return render(request, 'poly.html', {'data': dataJSON})
        except:
            error = "Veillez entré des chiffres."
            data = {
                "error": error
            }
            dataJSON = dumps(data)
            return render(request, 'poly.html', {'data':dataJSON, 'verif_error':verif_error, 'error':error})
    else: 
        error = "Veuillez remplir tous les champs."
        data = {
            "error": error
        }
        dataJSON = dumps(data)
        return render (request, 'poly.html', {'data': dataJSON, 'verif_error':verif_error, 'error':error})

def add_trigo(request):
    data ={
        "entry_1": "b"
    }
    return JsonResponse(data)