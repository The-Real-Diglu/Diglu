import json
from db import db
import os 
import time
import spacy
import googlemaps
from flask import Flask

from google.cloud import speech
import requests

def use_broadcastify(url, api_key):
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(url, headers=headers, stream=True)

    if response.status_code == 200:
        for block in response.iter_content(1024):
            process_audio_block(block)
            print(block)
    else:
        print("Failed to connect to Broadcastify")


url = "https://api.broadcastify.com/audio/feed/"
api_key = "dba349b2-e3fd-11ee-a225-0e676e2c8629"
connect_to_broadcastify(url, api_key)

# Function to be able to process audio blocks
def process_audio_block(block):
    obtain_audio(block)

# Function to be able to obtain and process audio from a file
def obtain_audio(audio_file_path):
    client = speech.SpeechClient()
    nlp = spacy.load("en_core_web_sm")


    with open(audio_file_path, 'rb') as audio_file:
        content = audio_file.read()

   audio = speech.RecognitionAudio(content=block)
   config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,  
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        text = result.alternatives[0].transcript
        print("Transcript: {}".format(text))

       
        doc = nlp(text)
        locations = [ent.text for ent in doc.ents if ent.label_ == "GPE" or ent.label_ == "LOC"]

        for location in locations:
            geocoded_location = geocode_address(location)
            if geocoded_location:
                print(f"Geocoded location for {location}: {geocoded_location}")
   

# this is just the url for ithaca on Google Maps just need API key
# https://www.google.com/maps/place/Ithaca,+NY/@42.4427012,-76.5189745,14z/data=!3m1!4b1!4m6!3m5!1s0x89d08182e0af88f7:0xae52768a56ece74!8m2!3d42.4439614!4d-76.5018807!16zL20vMDN2XzU?entry=ttu
# Mapping
def geocode_address(address):
    google_maps = googlemaps.Client(key='AIzaSyBt8b9ZmEGcKnFHTJ63B6HFlVQovVC5ghs')
    geocode_result = google_maps.geocode(address)
    if geocode_result:
        the_location = geocode_result[0]['geometry']['location']
        return the_location
    else:
        return None
# This is an example 
location = geocode_address("410 Thurston Avenue, Ithaca, NY")
print(location)

