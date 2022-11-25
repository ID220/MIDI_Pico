from pyblinkpico import *
import time
from machine import UART, Pin

uart = UART(0, baudrate=115200, tx=Pin(0), rx=Pin(1))
display.fill(0)

def play (channel, note, velocity=127, duration=1000):
    c= str(channel)
    n= str(note)
    v= str(velocity)
    d= str(duration)
    uart.write('midi,'+c+','+n+','+v+','+d+'\n')
    print('midi,'+c+','+n+','+v+','+d+'\n')
    
while True:
    if button_a.is_pressed():
        play(1,60)
    if button_b.is_pressed():
        play(1,62)
    if button_c.is_pressed():
        play(2,64)

    time.sleep_ms(100)