from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer
from .serializers import CreateRoomSerializer
from.serializers import FinalRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from random import shuffle
from english_words import english_words_set
from random import seed
from random import randint
from itertools import permutations
from django.http import JsonResponse

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format= None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].is_host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad CODE': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code param not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class FinalRoom(APIView):
    serializer_class = FinalRoomSerializer
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_play = serializer.data.get('guest_can_play')
            hidden_num = serializer.data.get('hidden_num')
            ana_word = serializer.data.get('ana_word')
            is_host = self.request.session.session_key
            all_words = serializer.data.get('all_words')
            points = serializer.data.get('points')
            final_words = serializer.data.get('final_words')
            queryset = Room.objects.filter(is_host=is_host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_play = guest_can_play
                room.hidden_num = hidden_num
                room.ana_word = ana_word
                room.all_words = all_words
                room.points = points
                room.final_words = final_words
                room.save(update_fields=['guest_can_play', 'hidden_num', 'ana_word', 'all_words', 'points',
                                         'final_words'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(is_host=is_host, guest_can_play=guest_can_play, hidden_num=hidden_num, ana_word=ana_word,
                            all_words=all_words, points=points, final_words=final_words)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    lookup = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup)

        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid room code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def createroom(self):
        wdLst = ["dealing","aligned", "leading", "alerted", "altered", "related", "treadle", "allergy", "gallery", "largely", "regally", "aridest",
                 "astride", "staider", "tardies", "tirades", "aspired", "despair", "diapers", "praised", "astride", "staider", "tirades", "canters",
                 "nectars", "recants", "scanter", "trances", "capitol", "optical", "topical","catered","created","reacted","claimed","decimal",
                 "declaim","medical","darters","retards","starred","traders","dearths","hardest","hatreds","threads","trashed","demerit","merited",
                 "mitered","detains","instead","sainted","stained","earnest","eastern","nearest","enlarge","general","gleaner","esprits","persist"
            ,"spriest","sprites","stripes","lusters","results","rustles","observe","obverse","verbose","parsley","parleys","players","replays"
            ,"sparely","parties","pastier","pirates","traipse","potters","protest","spotter","present","repents","serpent","rattles","starlet"
            ,"sstartle","realist","saltier","retails","recused","reduces","rescued","secured","repaint","painter","pertain","rosiest","sorties"
            ,"stories","saltier","realist","retails"]
        seed()
        l = randint(0,104)
        return(wdLst[l])

    def allWords(self, wd):

        fl = []
        fz = []
        fw = ""
        perm = permutations(wd, 3)
        fl3 = (list(perm))
        perm = permutations(wd, 4)
        fl4 = (list(perm))
        perm = permutations(wd, 5)
        fl5 = (list(perm))
        perm = permutations(wd, 6)
        fl6 = (list(perm))
        perm = permutations(wd, 7)
        fl7 = (list(perm))
        for i in fl3:
            fl.append(i)
        for i in fl4:
            fl.append(i)
        for i in fl5:
            fl.append(i)
        for i in fl6:
            fl.append(i)
        for i in fl7:
            fl.append(i)
        for i in fl:
            fz.append(i)
        fz = [''.join(i) for i in fl]
        for i in fz:
            if i in english_words_set:
                fw += i
                fw+= ','
        return(fw)

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_play = serializer.data.get('guest_can_play')
            hidden_num = serializer.data.get('hidden_num')
            ana_word = self.createroom()
            is_host = self.request.session.session_key
            all_words = self.allWords(ana_word)
            points = serializer.data.get('points')
            queryset = Room.objects.filter(is_host=is_host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_play = guest_can_play
                room.hidden_num = hidden_num
                room.ana_word = ana_word
                room.all_words = all_words
                room.points = points
                room.save(update_fields=['guest_can_play', 'hidden_num', 'ana_word', 'all_words', 'points'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(is_host=is_host, guest_can_play=guest_can_play, hidden_num=hidden_num, ana_word=ana_word, all_words=all_words, points=points)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ExitRoom(APIView):
    def post(self, request, format= None):
        if 'room_code' in self.request.session:
            code = self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(is_host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
        return Response({'message': 'Success'}, status=status.HTTP_200_OK)


class DeleteRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format= None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                room.delete()
                return Response('deleted', status=status.HTTP_200_OK)
            return Response({'Bad CODE': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code param not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):

    def get(self,request, format= None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data ={
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)