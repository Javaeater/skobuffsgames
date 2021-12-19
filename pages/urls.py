from django.urls import path
from .views import RoomView
from .views import CreateRoomView
from .views import GetRoom
from .views import JoinRoom
from .views import FinalRoom
from .views import ExitRoom
from .views import DeleteRoom
urlpatterns = [
    path("all-rooms", RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('final-room', FinalRoom.as_view()),
    path('exit-room', ExitRoom.as_view()),
    path('delete-room', DeleteRoom.as_view())

]