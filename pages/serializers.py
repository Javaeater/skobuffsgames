from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'is_host', 'guest_can_play', 'hidden_num', 'ana_word', 'all_words')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_play', 'hidden_num', 'ana_word', 'all_words')
